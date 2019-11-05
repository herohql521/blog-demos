var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
gulp.task('compress', function (cb) {
  pump([
        gulp.src('./web/js/*.js'),
        uglify({mangle:{reserved:['define','$','require','exports']}}),
        gulp.dest('./web/dist')
    ],
    cb
  );
});