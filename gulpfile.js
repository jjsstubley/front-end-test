var    gulp = require('gulp'),
      gutil = require('gulp-util'),
       sass = require('gulp-sass'),
    connect = require('gulp-connect'),
     uglify = require('gulp-uglify'),
     concat = require('gulp-concat'),
    wiredep = require('wiredep').stream,
     inject = require('gulp-inject');

gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

var bases = {
 app: 'app/',
 dist: 'dist/',
};

var paths = {
  scripts: ['js/*.js'],
  styles: ['sass/main.scss'],
  html: ['*.html']
}

gulp.task('copy', ['sass'], function(){
  var injectFiles = gulp.src(['dist/css/main.css']);

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };
 
  return gulp.src(bases.app + 'index.html')
    .pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  gulp.src(paths.styles, {cwd: bases.app})
  .pipe(wiredep())
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest(bases.dist + 'css'))
});

gulp.task('js', function() {
  gulp.src(paths.scripts, {cwd: bases.app})
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest(bases.dist + 'js'))
});


gulp.task('watch', function() {
  gulp.watch(bases.app + paths.html, ['copy']);
  gulp.watch(bases.app + paths.scripts, ['js']);
  gulp.watch(bases.app + paths.styles, ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(paths.html, {cwd: bases.app})
  .pipe(connect.reload())
});

gulp.task('default', ['copy', 'html', 'js', 'sass', 'connect', 'watch']);