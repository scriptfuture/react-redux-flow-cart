var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve({
  root: ['public'],
  port: 5000
}));

gulp.task('default', ['serve']);