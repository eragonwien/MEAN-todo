var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var userref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('public'))
});

gulp.task('minicss', function () {
    return gulp.src('public/stylesheets')
        .pipe(plumber())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: 'public'
        }
    });
});

gulp.task('browser-sync-reload', function () {
    browserSync.reload();
});

gulp.task('minijs', function () {
    return gulp.src('src/index.html')
        .pipe(plumber())    
        .pipe(userref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('public'))   
});

gulp.task('favicon', function () {
    return gulp.src('src/favicon.ico')
        .pipe(gulp.dest('public'))
});

gulp.task('bundle', ['sass', 'minijs', 'favicon']);

gulp.task('watch', ['minicss'], function () {
    gulp.watch('public/stylesheets/style.css', ['minicss']);
});

gulp.task('public', ['bundle'], function () {
    return gulp.src('public/*')
    .pipe(gulp.dest('../docs'))
});