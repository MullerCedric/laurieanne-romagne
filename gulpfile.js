/* Laurieanne-Romagne - exercise for HEPL Technical College
 *
 * /gulpfile.js - Gulp tasks
 *
 * coded by MullerCedric
 * started at 09/04/2018
 */

var gulp = require("gulp"),
    image = require("gulp-image"),
    htmlmin = require('gulp-htmlmin'),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    csso = require("gulp-csso"),
    pug = require("gulp-pug"),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps");

// --- Task for images
gulp.task("images", function () {
    gulp.src("src/images/**")
        .pipe(image())
        .pipe(gulp.dest("assets/images"));
});

// --- Task for pug
gulp.task("html", function(){
    gulp.src("src/pug/**/*.pug")
        .pipe(pug({}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./"));
});

// --- Task for styles
gulp.task("css", function () {
    gulp.src("src/sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest("assets/css"));
});

// --- Task for js
gulp.task("js", function () {
    gulp.src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on("error", function (oError) {
            console.error(oError);
            this.emit("end");
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("assets/js"));
});


// --- Watch tasks
gulp.task("watch", function () {
    gulp.watch("src/images/**", ["images"]);
    gulp.watch("src/pug/**/*.pug", ["html"]);
    gulp.watch("src/sass/**/*.scss", ["css"]);
    gulp.watch("src/js/**/*.js", ["js"]);
});

// --- Aliases
gulp.task("default", ["images", "html", "css", "js"]);
gulp.task("work", ["default", "watch"]);