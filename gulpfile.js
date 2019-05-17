// Подключение пакетов
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

const cssFiles = [
    './src/css/main.css'
];

const jsFiles = [
    './src/js/main.js'
]

// Задачи для gulp

function styles() {
    return gulp.src('src/**/*.css')
    .pipe(concat('bundle.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8', level: 2}))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('src/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify({toplevel: true}))
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream());
}

function clean() {
    return del(['assets/*']);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);

gulp.task('build', gulp.series(gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));