var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	streamify = require('gulp-streamify'),
	source = require('vinyl-source-stream');

gulp.task('lint', function() {
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src('../scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('../scss'));
});

gulp.task('build', function() {
	var bundleStream = browserify('./gopher.js').bundle();
	bundleStream
    .pipe(source('gopher.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
    gulp.watch('*.js', ['lint', 'build']);
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'build', 'watch']);