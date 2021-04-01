const { dest, series, src, parallel } = require("gulp");
const concat = require("gulp-concat");
const del = require("delete");
const srcB = require('gulp-bem-src');

const sass = require("gulp-sass");

const minifyCSS = require("gulp-clean-css");

function blocks_homepage() {
    return srcB(
        ['./src/blocks'],
        [{ block: 'burger-menu' }, { block: 'checkbox-btn' }, { block: 'column-card' },
        { block: 'column-card1' }, { block: 'column-card-preview' }, { block: 'combo-box' },
        { block: 'great-title' }],
        'scss',
        {

            config: {
                './src/blocks': { scheme: 'nested' }
            }
        }
    )
        .pipe(sass())
        .pipe(concat("./src/pages/homepage/index-style.css"))
        .pipe(minifyCSS())
        .pipe(dest("./"));

}


function scss_homepage() {
    return src("./src/pages/homepage/scss/import.scss")
    .pipe(sass())
    .pipe(concat("./src/pages/homepage/index-style.css"))
    .pipe(minifyCSS())
    .pipe(dest("./"));
}
exports.default = series(scss_homepage);

