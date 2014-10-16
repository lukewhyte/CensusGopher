var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	streamify = require('gulp-streamify'),
	source = require('vinyl-source-stream'),
	paths = {
		scripts: ['./*.js', './models/*.js', './json-models/*.json'],
		sass: ['../sass/*.scss']
	},

	runSass = function (style) {
		return gulp.src('../sass/main.scss')
    .pipe(sass({ style: style }))
    .pipe(gulp.dest('../sass'));
	};

gulp.task('lint', function () {
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sandbox', function () {
  gulp.watch(paths.scripts, function () {
  	var bundleStream = browserify('./gopher.js').bundle();
			bundleStream
		    .pipe(source('gopher.js'))
		    .pipe(gulp.dest('./build/'));
		  });
  gulp.watch(paths.sass, function () {
  	runSass('expanded');
  });
});

gulp.task('default', function () {
	var bundleStream = browserify('./gopher.js').bundle();
	bundleStream
    .pipe(source('gopher.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./build/'));
  runSass('compressed');
});