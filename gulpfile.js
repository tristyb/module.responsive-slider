// GET ALL THE THINGS
var gulp                  = require('gulp');
var gutil 					      = require("gulp-util");
var notify                = require('gulp-notify');
var plumber               = require('gulp-plumber');
var rename                = require('gulp-rename');
var zip                   = require('gulp-zip');

// sass
var autoprefixer          = require('autoprefixer');
var nano                  = require('gulp-cssnano');
var postcss               = require('gulp-postcss');
var sass                  = require('gulp-sass');

// javascript
var uglify                = require('gulp-uglify');
var concat                = require('gulp-concat');

// project variables
var app                   = './assets/'; // The source directory
var dist                  = './build/'; // The output directory

// the watch task, keeps an eye on things to reun changes
gulp.task('watch', function() {
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
});

// gulp.task("lint", function() {
//   return gulp.src(src_path + "js/scripts.js")
//     .pipe(jshint())
//     .pipe(jshint.reporter("jshint-stylish"))
// 	.pipe(notify(function (file) {
//       if (file.jshint.success) {
//         // Don't show something if success
//         return false;
//       }
//
//       var errors = file.jshint.results.map(function (data) {
//         if (data.error) {
//           return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
//         }
//       }).join("\n");
//       return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
//     }));
// });

// compile js files and compress them
gulp.task('build-js', function(){
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
});

// compile sass and minify, autoprefix
gulp.task('css', function() {
  return gulp.src(app + 'sass/main.scss')
	  .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red(error.message));
      notify().write(error);
      this.emit('end');
	  }))
	  .pipe(sass({
		  errLogToConsole: false,
      onError: function(err) {
        return notify().write(err);
      }
    }))
	  .pipe(postcss([
		  autoprefixer({
			  browsers: ['last 2 versions', '> 2%', 'ie > 8']
		  }),
	  ]))
    .pipe(nano())
	  .pipe(gulp.dest(dist + 'css'))
    // .pipe(gulp.dest('_site/' + dist + 'css'))
});

// copy to joomla
gulp.task('moveToDev', function() {
  return gulp.src(
      [
        'build/**/',
        'language/**/',
        'tmpl/**/',
        'create_script.php',
        'helper.php',
        'index.html',
        'mod_tristans_responsive_slider.php',
        'mod_tristans_responsive_slider.xml'
      ], { base : '.' }
    )
    .pipe(gulp.dest('/Users/tristanbrookes/Developer/www/joomla.dev/modules/mod_tristans_responsive_slider'))
});

// compress a zip
gulp.task('compress', function() {
  return gulp.src(
      [
        'build/**/',
        'language/**/',
        'tmpl/**/',
        'create_script.php',
        'helper.php',
        'index.html',
        'mod_tristans_responsive_slider.php',
        'mod_tristans_responsive_slider.xml'
      ], { base : '.' }
    )
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('dev', ['build-js', 'css', 'moveToDev']);
gulp.task('build', ['build-js', 'css', 'compress']);
gulp.task('default', ['dev', 'watch']);
