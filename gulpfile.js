// Utility Requirements.
const gulp = require('gulp');
const gutil = require("gulp-util");
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const zip = require('gulp-zip');
const del = require('del');
const rename = require('gulp-rename');

// Styles.
const autoprefixer = require('autoprefixer');
const nano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));

// Javascript.
const webpack = require('webpack-stream');
const webpackCompiler = require('webpack');
const webpackConfig = require('./webpack.config.js');

// Project variables
const app = './src/'; // The source directory.
const dist = './build/'; // The output directory.
const copyLocation = process.platform === 'darwin' ? '/Applications/MAMP/htdocs/modules/mod_tristans_responsive_slider' : '/mnt/c/MAMP/htdocs/modules/mod_tristans_responsive_slider'; // The dev directory.

// The watch task, keeps an eye on things to reun changes.
function watch() {
  // watch for changes inside src folder
  gulp.watch(app + 'css/*.scss', gulp.series('dev'));
  gulp.watch('./language/**/*', gulp.series('dev'));
  gulp.watch('./tmpl/**/*', gulp.series('dev'));
  gulp.watch('./*.php', gulp.series('dev'));
  gulp.watch('./*.xml', gulp.series('dev'));
  gulp.watch(app + 'js/**/*', gulp.series('dev'));

  return gulp.src('.')
    .pipe(notify({
      'title': 'Browser-sync',
      'message': 'is up and running on localhost:3000. Watching. Never blinking. Like the Eye of Sauron.',
    }));
};

gulp.task(watch);

// Compile js files and compress them.
function buildJs() {
  if (process.argv.indexOf('build') > -1) {
    webpackConfig.devtool = false;
    webpackConfig.mode = 'production';
  }

  return gulp.src(`src/js/scripts.js`)
    .pipe(webpack(webpackConfig, webpackCompiler))
    .pipe(
      gulp.dest(dist)
    );
}

gulp.task(buildJs);

// Compile sass and minify, autoprefix.
function css() {
  return gulp.src(app + 'css/style.scss')
    .pipe(plumber(function (error) {
      gutil.log(gutil.colors.red(error.message));
      notify().write(error);
      this.emit('end');
    }))
    .pipe(sass({
      errLogToConsole: false,
      onError: function (err) {
        return notify().write(err);
      }
    }))
    .pipe(postcss([
      autoprefixer(),
      nano(),
    ]))
    .pipe(rename("mod_tristans_responsive_slider.min.css"))
    .pipe(gulp.dest(dist))
};

gulp.task(css);

// Copy to joomla.
function moveToDev() {
  return gulp.src(
    [
      'build/**/*',
      'language/**/*',
      'tmpl/**/*',
      'helper.php',
      'index.html',
      'slide_form.xml',
      'mod_tristans_responsive_slider.php',
      'mod_tristans_responsive_slider.xml'
    ], { base: '.' }
  )
    .pipe(gulp.dest(copyLocation))
};

gulp.task(moveToDev);

// Vompress a zip.
function compress() {
  return gulp.src(
    [
      'build/**/*',
      'language/**/*',
      'tmpl/**/*',
      'helper.php',
      'index.html',
      'slide_form.xml',
      'mod_tristans_responsive_slider.php',
      'mod_tristans_responsive_slider.xml'
    ], { base: '.' }
  )
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('dist/'))
};

gulp.task(compress);

function cleanDev() {
  return del([
    `${copyLocation}/**`,
    `!${copyLocation}`,
  ], {
    force: true,
  });
}

gulp.task(cleanDev);

function cleanBuild() {
  return del([
    `${dist}**`,
    `!${dist}`,
    `!${dist}.gitkeep`,
  ]);
}

gulp.task(cleanBuild);

gulp.task('dev', gulp.series('cleanDev', 'buildJs', 'css', 'moveToDev'));
gulp.task('build', gulp.series('cleanBuild', 'buildJs', 'css', 'compress'));
gulp.task('default', gulp.series('dev', 'watch'));
