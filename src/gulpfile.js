const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function compilaSass() {
  return gulp
  .src('css/scss/*.scss')
    .pipe(sass({outputStyle: "compressed"}))
     .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
     }))
     .pipe(gulp.dest('css/'))
}

function watch() {
  gulp.watch('css/scss/*.scss', compilaSass);
}

gulp.task('sass', compilaSass);
gulp.task('default', watch);