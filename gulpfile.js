const { dest, series, src, parallel } = require("gulp");
const concat = require("gulp-concat");
const del = require("delete");
const image = require('gulp-image');
const pug = require('gulp-pug');
const rename = require('gulp-rename');

const sass = require("gulp-sass");

const minifyCSS = require("gulp-clean-css");


const pages_path = [
    { name: "homepage", path: "./src/pages/homepage" }
]

function page_js(name, path) {
    return src(path + '/js/*.js')
        .pipe(concat(`./build/js/${name}.js`))
        .pipe(dest('./'));
}

function page_scss(name, path) {
    return src(path + "/scss/import.scss")
        .pipe(sass())
        .pipe(concat(`./build/style/${name}.css`))
        .pipe(minifyCSS())
        .pipe(dest("./"));
}

function page_html(name, path) {
    return src(path + "/index.pug")
        .pipe(pug({
            pretty: true,
        }))
        .pipe(rename(name+'.html'))
        .pipe(dest(`./build/`));
}

function cleanUp() {
    return del("./build");
}

function build_img() {
    return src('./src/img/*')
        .pipe(image())
        .pipe(dest('./build/img'));
};

function build_scss() {

    return new Promise(function (resolve, reject) {
        pages_path.forEach(element => {
            page_scss(element.name, element.path);
        });

        resolve();
    });
}
function build_js() {

    return new Promise(function (resolve, reject) {
        pages_path.forEach(element => {
            page_js(element.name, element.path);
        });

        resolve();
    });
}

function build_html() {
    return new Promise(function (resolve, reject) {
        pages_path.forEach(element => {
            page_html(element.name, element.path);
        });

        resolve();
    });
}

exports.default = series(cleanUp, parallel(build_img, build_scss, build_js, build_html));