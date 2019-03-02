/*eslint-env node */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const jasmineBrowser = require('gulp-jasmine-browser');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task(
	'default',
	['copy-html', 'copy-fonts', 'styles', 'lint', 'scripts', 'copy-jasmin'],
	function() {
		gulp.watch('src/css/**/*.css', ['styles']);
		gulp.watch('src/js/**/*.js', ['lint']);
		gulp.watch('src/index.html', ['copy-html']);
		gulp.watch('./dist/index.html').on('change', browserSync.reload);

		browserSync.init({
			server: './dist'
		});
	}
);

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp
		.src('src/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp
		.src('./src/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('src/index.html').pipe(gulp.dest('./dist'));
});

gulp.task('copy-jasmin', function() {
	gulp.src('src/jasmin/*').pipe(gulp.dest('./dist/jasmin'));
});

gulp.task('copy-fonts', function() {
	gulp.src('src/fonts/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', function() {
	gulp
		.src('src/css/**/*.css')
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions']
			})
		)
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('lint', function() {
	return (
		gulp
			.src(['js/**/*.js'])
			// eslint() attaches the lint output to the eslint property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format())
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failOnError last.
			.pipe(eslint.failOnError())
	);
});

gulp.task('tests', function() {
	return gulp
		.src('src/jasmine/spec/feedreader.js')
		.pipe(jasmineBrowser.specRunner({ console: true }))
		.pipe(jasmineBrowser.headless({ driver: 'chrome' }));
});

// gulp.task('tests', function() {
// 	gulp
// 		.src('src/jasmine/spec/feedreader.js')
// 		.pipe(jasmineBrowser.specRunner())
// 		.pipe(jasmineBrowser.server({ port: 3001 }));
// });
