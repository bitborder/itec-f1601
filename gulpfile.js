var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    compass = require('gulp-compass'),
    cssmin = require('gulp-cssmin'),
    uncss = require('gulp-uncss'),
    copy = require('gulp-copy'),
    watch = require('gulp-watch'),
    scp = require('gulp-scp');

// Styles Task
// Compiles less files
gulp.task('styles', function() {
    gulp.src('src/sass/gumby.scss')
    .pipe(compass({
      css: 'dist/devel/css',
      sass: 'src/sass',
      image: 'src/images'
    }))
    .pipe(uncss({
        html: ['src/index.html', 'src/**/*.html'],
        //ignore: ["js"]
    }))
    .pipe(gulp.dest('dist/devel/css/'));
});

// HTML task
// Copies html files to dist dir
gulp.task('html', function() {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist/devel/'));
});

// JavaScript task
// Copies js-files to dist dir
gulp.task('js', function() {
    gulp.src('bower_components/vivus/dist/vivus.min.js')
    .pipe(gulp.dest('dist/devel/js/'));
    gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/devel/js/'));
    gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/devel/js/'));
})

// Watch Task
// Look for change files an compile/copy them
gulp.task('watch', function(){
    gulp.watch('src/sass/*.scss', ['styles']);
    gulp.watch('src/*.html', ['html']);
});

// Production Task
// Optimize files for production server
gulp.task('production', ['default'], function(){
    //TODO
    //Create minified css, html, js
    //Optimize css, compress images
});

// Deploy Task
// Put dist/prod/ to server
gulp.task('deploy', function(){
    //Deploy to server with ssh-keys
    gulp.src('dist/devel/*')
    .pipe(scp({
        host: 'damian2.myhostpoint.ch',
        user: 'damian2',
        path: '~/www/macplus/'

    }));
});

gulp.task('default', ['html', 'styles']);
