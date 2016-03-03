var gulp = require("gulp"),
  sass = require("gulp-sass"),
  webserver = require("gulp-webserver"),
  cleanCSS = require('gulp-clean-css'),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require('gulp-autoprefixer'),
  savefile = require('gulp-savefile');

gulp.task("watch", function() {
  gulp.watch("src/assets/scss/**/*.scss", ["build-css"]);
})

gulp.task("server", function() {
  return gulp.src('dev')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 8080
    }));
})

gulp.task("build-css", function() {
  return gulp.src("src/assets/scss/app.scss")
      .pipe(savefile())
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sass())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dev/app.css"));
});

gulp.task("minify-css", function() {
  return gulp.src("dev/app.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/app.min.css"));
});

gulp.task("minify-js", function() {
  // TODO: how to minify angular files properly.
})

gulp.task("build", ["minify-css, minify-js"]);
gulp.task("default", ['watch', 'server']);
