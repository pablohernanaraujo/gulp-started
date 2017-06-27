/* Ingresamos dependecias */
const gulp        = require('gulp'),
	  jade        = require('gulp-jade'),
	  stylus      = require('gulp-stylus'),
		nib         = require('nib'),
	  uglify      = require('gulp-uglify'),
	  concat      = require('gulp-concat'),
	  plumber     = require('gulp-plumber'),
	  browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('html', () => {
	return gulp.src('src/jade/**/*.jade')
		.pipe(plumber())
		.pipe(jade({pretty: false}))
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream: true}));
});

gulp.task('css', () => {
	return gulp.src('src/stylus/styles.styl')
		.pipe(plumber())
		.pipe(stylus({compress: true}))
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream: true}));
});

gulp.task('js', () => {
	return gulp.src('src/scripts/**/*.js')
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream: true}));
});

gulp.task('watch', () => {
	gulp.watch('src/jade/**/*.jade',['html']);
	gulp.watch('src/stylus/styles.styl',['css']);
	gulp.watch('src/scripts/**/*.js',['js']);
});


gulp.task('browserSync', () => {
	browserSync({
		server: {
			baseDir: 'build'
		}
	});
});

gulp.task('default', ['html','css','js','browserSync','watch']);