"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var cssmin = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var del = require("del");
var mqpacker = require("css-mqpacker");
var rename = require("gulp-rename");
var run = require("run-sequence");
var config = require("./config.js");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    config.src.fonts,
    config.src.html
    ], {
      base: "."
    })
  .pipe(gulp.dest(config.dest));
});

gulp.task("style", function() {
  gulp.src(config.src.precss)
  .pipe(plumber())
  .pipe(postcss([
    precss(),
    autoprefixer({browsers: [
      "last 2 versions"
      ]})
    ]))
  .pipe(gulp.dest(config.build.css))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest(config.build.css))
  .pipe(server.reload({stream: true}));
});

gulp.task("js", function () {
  return gulp.src(config.src.js)
  .pipe(gulp.dest(config.build.js))
  .pipe(uglify())
  .pipe(rename("app.min.js"))
  .pipe(gulp.dest(config.build.js))
  .pipe(server.reload({stream: true}));
});

gulp.task("images", function() {
  return gulp.src(config.src.img)
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
    ]))
  .pipe(gulp.dest(config.build.img))
  .pipe(server.reload({stream: true}));
});

gulp.task("html:update", function() {
  return gulp.src(config.src.html)
  .pipe(gulp.dest(config.dest))
  .pipe(server.reload({stream: true}));
});

gulp.task("fonts:update", function () {
  return gulp.src(config.fonts)
  .pipe(gulp.dest(config.build.fonts))
  .pipe(server.reload({stream: true}));
});

gulp.task("serve", function() {
  server.init({
    server: config.dest,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(config.src.img, ["images"]);
  gulp.watch(config.watch.precss, ["style"]);
  gulp.watch(config.src.js, ["js"]);
  gulp.watch(config.src.html, ["html:update"]);
  gulp.watch(config.src.fonts, ["fonts:update"]);
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "js",
    "images",
    fn
    );
});
