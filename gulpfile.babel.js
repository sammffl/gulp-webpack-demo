'use strict';
import path from 'path';
import gulp from 'gulp';
import less from 'gulp-less';
import htmlmin from 'gulp-htmlmin';
import pug from 'gulp-pug';
import cssBase64 from 'gulp-css-base64';
import imagemin from 'gulp-imagemin';
import babel from 'gulp-babel';

//postcss相关插件
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnext from 'cssnext';
import precss from 'precss';

const PATH = {
    originalPath: path.join(__dirname, 'public'),
    projectPath: path.join(__dirname, 'slotMachine')
}

gulp.task('compileLess', () => {
    const processors = [
        autoprefixer,
        cssnext,
        precss
    ];
    gulp.src(`${PATH.originalPath}/less/**/*.less`)
        .pipe(less())
        .pipe(cssBase64())
        .pipe(postcss(processors))
        .pipe(gulp.dest(`${PATH.projectPath}/public/css`))
});

gulp.task('babelJs', () => {
    gulp.src(`${PATH.originalPath}/js/**/*.js`)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`${PATH.projectPath}/public/js`));
});

gulp.task('moveHtml', () => {
    gulp.src(`${__dirname}/index.pug`)
        .pipe(pug({

        }))
        .pipe(gulp.dest(PATH.projectPath));
});

gulp.task('moveImages', () => {
    gulp.src(`${PATH.originalPath}/images/**/*.*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${PATH.projectPath}/public/images`));
});

gulp.task('default', [
    'compileLess',
    'babelJs',
    'moveHtml',
    'moveImages'
]);
