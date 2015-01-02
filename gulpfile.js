var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jslint = require('gulp-jslint'),
    uglify = require('gulp-uglify'),
    prettydata = require('gulp-pretty-data'),
    jsonminify = require('gulp-jsonminify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),

    scripts = [
        'js/_license.js',
        'js/_tanguy.js',
        'js/_saveprogram.js',
        'js/_populateprograms.js',
        'js/_loadprogram.js',
        'js/_updateprogram.js',
        'js/_updatepanel.js',
        'js/_shiftoctave.js',
        'js/_calculatepitch.js',
        'js/_gateon.js',
        'js/_gateoff.js',
        'js/_buildsynth.js',
        'js/_externalinput.js',
        'js/_documentready.js',
        'js/_oscillator1controls.js',
        'js/_oscillator2controls.js',
        'js/_noisecontrols.js',
        'js/_lfocontrols.js',
        'js/_delaycontrols.js',
        'js/_mixercontrols.js',
        'js/_filtercontrols.js',
        'js/_vcacontrols.js',
        'js/_pitchwheelcontrols.js',
        'js/_modwheelcontrols.js',
        'js/_slidercontrols.js',
        'js/_buttoncontrols.js',
        'js/_storeprogram.js',
        'js/_keyboardcontrols.js'
    ];

gulp.task('dev', function () {
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

gulp.task('presets', function () {
    return gulp.src('programs/*.json')
    .pipe(prettydata({type: 'prettify'}))
    .pipe(gulp.dest('programs'))
    .pipe(jsonminify())
    .pipe(gulp.dest('tanguy/programs'))
});

gulp.task('sass', function () {
    return gulp.src('css/tanguy.scss')
    .pipe(sass({style: 'compressed'}))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('tanguy/css'))
    .pipe(livereload())
});

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('js/*.js', ['dev']);
    gulp.watch('programs/*.json', ['presets']);
    gulp.watch('css/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
