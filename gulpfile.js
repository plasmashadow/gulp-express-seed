var watchify = require('watchify'),
    path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    gls = require('gulp-live-server'),
    mocha = require('gulp-mocha');


gulp.task('server', function() {
    var options = {
        cwd: undefined
    };
    options.env = process.env;
    options.env.NODE_ENV = 'development';

    var server = gls('./index.js', options, 35729);
    server.start();

    gulp.watch([
            './**/*.js*'
        ], function () {
        server.start();
    });
    gulp.watch([
            'static/**/*.css',
            'static/**/*.js'
        ], function () {
        server.notify.apply(server, arguments);
    });
});


gulp.task('styles', function() {
  return gulp.src('client/less/screen.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/assets/css'))
    .pipe(cssmin());
});

gulp.task('test', function(){
  return gulp.src('tests/*').pipe(mocha({
    reporter: 'nyan'
  }))
})

gulp.task('dev', ['server', 'test'], function() {
    // gulp.watch('client/less/**/*.less', ['styles']);
});

gulp.task('default', ['dev'], function() {

});
