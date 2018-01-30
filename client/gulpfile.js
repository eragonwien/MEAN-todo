var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var userref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
/* browser sync */
gulp.task('sync', function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: 'public'
        }
    });
});

gulp.task('sync-reload', function () {
    browserSync.reload();
});

/* sass and minify css */
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('public'))
});

/* minify js and bundling */
gulp.task('js', function () {
    return gulp.src('src/index.html')
        .pipe(plumber())    
        .pipe(userref())
        //.pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('public'))   
});

/* minify images */
gulp.task('image', function () {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|png)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('public/images'))
})
/* gzip */

/* other transfer to public */
gulp.task('favicon', function () {
    return gulp.src('src/favicon.ico')
        .pipe(gulp.dest('public'))
});

/* public */
gulp.task('public', function () {
    runSequence('sass', 'image', 'js', 'favicon')
});

gulp.task('public-sync', function () {
    runSequence('sass', 'image', 'js', 'favicon', 'sync')
});

/* transfer to docs */
gulp.task('docs', function () {
    return gulp.src('public/*')
        .pipe(gulp.dest('../docs'))
})
/* watch */
gulp.task('watch', ['public-sync'], function () {
    gulp.watch('src/sass/**/*.scss', ['sass', 'sync-reload']);
    gulp.watch('src/js/**/*.js', ['js', 'sync-reload']);
    gulp.watch('src/favicon.ico', ['favicon', 'sync-reload']);
    gulp.watch('src/images/*', ['image', 'sync-reload']);
    gulp.watch('src/*.html', ['public', 'sync-reload']);
});