/*const { src, dest, series, parallel, watch } = require('gulp');
const file_include = require('gulp-file-include');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

const gulp = require('gulp');

//html
const html_task = () =>src('app/*.html')
    .pipe(dest('dist'));

//scss
const scss_task = () => src('app/scss/*.scss')
    .pipe(concat('index.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/css'));

//js
const js_task = () => src('app/js/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/js'));

//img
const img_task = () => src('app/img/*.+(jpg|jpeg|png|gif)')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interLaced: true
    }))
    .pipe(dest('dist/img'));

//browserSync
const browserSync_task = () =>browserSync.init({
    server: {
        baseDir: 'dist/',
    }
});

//watch
const watch_task = () => {
    browserSync_task();
    watch('app/*.html', parallel(html_task));
    watch('app/scss/*.scss', parallel(scss_task));
    watch('app/js/*.js', parallel(js_task));
    watch('app/img/*.+(jpg|jpeg|png|gif)', img_task);
}

gulp.task('default', gulp.parallel('browser-sync','watch'));
*/

const {src, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const file_include = require('gulp-file-include');
const gulp = require("gulp");
const imagemin = require('gulp-imagemin');


// Minify SCSS
gulp.task('sass', () => {
    return src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([cssnano()]))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('dist/css'))
});

// Minify JS
gulp.task('uglify', () => {
    return src('app/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
});

// Include html files together
gulp.task('html', () => {
    return src('app/index.html')
        .pipe(file_include({
            prefix: '@@',
            basepath: '@file'}))
        .pipe(dest('dist'));
});

// Compress img
gulp.task('img', () => {
    return src('app/img/*',{encoding:false})
        .pipe(imagemin())
        .pipe(dest('dist/img'));
});

// Watcher
gulp.task('watch', () => {
    gulp.watch('app/scss/*.scss', gulp.series('sass'));
    gulp.watch('app/js/*.js', gulp.series('uglify'));
    gulp.watch('app/index.html', gulp.series('html'));
    gulp.watch('app/html/*.html', gulp.series('html'));
    //gulp.watch('app/img/*.png', gulp.series('img'));
});

// Update browser
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
        }
    });
    gulp.watch('./dist').on('change', browserSync.reload);
});

gulp.task('default',gulp.parallel('browser-sync','watch'));