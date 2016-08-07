var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    htmlmin = require('gulp-htmlmin'),
    cssBase64 = require('gulp-css-base64'),
    imagemin = require('gulp-imagemin');

//postcss相关插件
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    precss = require('precss');


var originalPath = path.join(__dirname, 'public');
var projectPath = path.join(__dirname, 'slotMachine');

gulp.task('compileLess', function () {

    var processors = [
        autoprefixer({ browsers: ['last 2 versions'] }),
        cssnext,
        precss
    ];
    gulp.src(path.join(originalPath, 'less/**/*.less'))
        .pipe(less())
        .pipe(cssBase64())
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.join(projectPath, 'public/css')));
});

gulp.task('moveHtml', function () {
    gulp.src(path.join(__dirname, "index.html"))
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(projectPath))
});

gulp.task('moveImages', function () {
    gulp.src(path.join(originalPath, 'images/**/*.*'))
        .pipe(imagemin())
        .pipe(gulp.dest(path.join(projectPath, 'public/images')))
});


gulp.task('default', [
    'compileLess',
    'moveHtml',
    'moveImages'
]);




