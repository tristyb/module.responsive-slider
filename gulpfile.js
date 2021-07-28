// GET ALL THE THINGS
var gulp = require('gulp');
var gutil = require("gulp-util");
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var zip = require('gulp-zip');

// sass
var autoprefixer = require('autoprefixer');
var nano = require('cssnano');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass')(require('sass'));

// javascript
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// project variables
var app = './assets/'; // The source directory
var dist = './build/'; // The output directory

// the watch task, keeps an eye on things to reun changes
function watch() {
  // watch for changes inside src folder
  gulp.watch(app + 'css/style.scss', ['dev']);
  gulp.watch('./language/**/*', ['dev']);
  gulp.watch('./tmpl/**/*', ['dev']);
  gulp.watch('./*.php', ['dev']);
  gulp.watch('./*.xml', ['dev']);
  gulp.watch(app + 'js/**/*', ['dev']);

  return gulp.src('.')
    .pipe(notify({
      'title': 'Browser-sync',
      'message': 'is up and running on localhost:3000. Watching. Never blinking. Like the Eye of Sauron.',
    }));
};

gulp.task(watch);

// compile js files and compress them
function buildJs() {
  return gulp.src([
    app + "js/*"
  ])
    // forces gulp to output errors to terminal
    .pipe(plumber())
    // concat js files
    .pipe(concat('scripts.min.js'))
    // compress js files
    .pipe(uglify())
    // output file to dist
    .pipe(gulp.dest(dist))
};

gulp.task(buildJs);

// compile sass and minify, autoprefix
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
    .pipe(gulp.dest(dist))
  // .pipe(gulp.dest('_site/' + dist + 'css'))
};

gulp.task(css);

// copy to joomla
function moveToDev() {
  return gulp.src(
    [
      'build/**/',
      'language/**/',
      'tmpl/**/',
      'helper.php',
      'index.html',
      'slide_form.xml',
      'mod_tristans_responsive_slider.php',
      'mod_tristans_responsive_slider.xml'
    ], { base: '.' }
  )
    .pipe(gulp.dest('/Applications/MAMP/htdocs/modules/mod_tristans_responsive_slider'))
};

gulp.task(moveToDev);

// compress a zip
function compress() {
  return gulp.src(
    [
      'build/**/',
      'language/**/',
      'tmpl/**/',
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

gulp.task('dev', gulp.series('buildJs', 'css', 'moveToDev'));
gulp.task('build', gulp.series('buildJs', 'css', 'compress'));
gulp.task('default', gulp.series('dev', 'watch'));
