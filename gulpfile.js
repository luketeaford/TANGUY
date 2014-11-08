var gulp = require('gulp'),
    jslint = require('gulp-jslint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    minifyHTML = require('gulp-minify-html'),

    scripts = [
        'js/_license.js',
        'js/_tanguy.js',
        'js/_saveprogram.js',
        'js/_loadprogram.js',
        'js/_shiftoctave.js',
        'js/_multiswitch.js',
        'js/_stoptweaking.js',
        'js/_calculatelfo.js',
        'js/_calculatepitch.js',
        'js/_gateon.js',
        'js/_gateoff.js',
        'js/_buildsynth.js',
        'js/_documentready.js',
        'js/_oscillator1controls.js',
        'js/_oscillator2controls.js',
        'js/_noisecontrols.js',
        'js/_lfocontrols.js',
        'js/_delaycontrols.js',
        'js/_mixercontrols.js',
        'js/_filtercontrols.js',
        'js/_vcacontrols.js',
        'js/_portamentocontrols.js',
        'js/_pitchwheelcontrols.js',
        'js/_modwheelcontrols.js',
        'js/_slidercontrols.js',
        'js/_keyboardcontrols.js'
    ];

gulp.task('dev', function() {
    return gulp.src(scripts)
    .pipe(concat('tanguy.js'))
    .pipe(gulp.dest('js'))
    .pipe(jslint({
        browser: true,
        devel: true,
        predef: ['$', 'AudioContext', 'Float32Array']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('tanguy/js'))
});

gulp.task('sass', function() {
    return gulp.src('css/*.scss')
    .pipe(sass({style: 'compressed'}))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('tanguy/css'))
});

gulp.task('html', function() {
    return gulp.src('index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('tanguy'))
})