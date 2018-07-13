require('./gulp/sprite.js');
const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function(){
    return gulp.src(['./public_static/assets/styles/sass/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public_static/assets/styles/css'))
        .pipe(browserSync.stream());
})

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: 'public_static'
    })

    gulp.watch(['./public_static/assets/styles/sass/**/*.scss'], ['sass']);
    gulp.watch(['./public_static/*.html']).on('change', browserSync.reload);
    gulp.watch(['./public_static/assets/scripts/**/*.js']);
})

// Default
gulp.task('default', ['serve']);