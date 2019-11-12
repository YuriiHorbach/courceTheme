var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch');



gulp.task('compress', function() {
  gulp.src("./assets/img/*")
  .pipe(imagemin())
  .pipe(gulp.dest('./build/img'));
});


// gulp.task('default', ['compress'], function() {
//     return gulp.watch('./assets/img/*', ['compress']);
// });



gulp.task('sass', function(){
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});




gulp.task('default', ['sass' , 'compress'], function() {
    return gulp.watch('./assets/sass/**/*.scss', ['sass', 'compress']);
});