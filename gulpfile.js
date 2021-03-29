const { src, dest , series} = require("gulp");
const concat = require("gulp-concat");
const del = require("delete");

const sass = require("gulp-sass");

const minifyCSS = require("gulp-clean-css");

function scss(){
    return src("./src/style/import.scss").pipe(sass()).pipe(dest("build")).pipe(concat("index-style.css")).pipe(minifyCSS()).pipe(dest("./"));
}


function cleanUp() {
    return del("./index-style.css");
}

exports.default = series(cleanUp, scss);