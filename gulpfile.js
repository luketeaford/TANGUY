var gulp = require('gulp'),
    concat = require('gulp-concat'),
    //uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass');

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
        //'js/_octaveshiftbuttons.js',
        'js/_portamentocontrols.js',
        'js/_pitchwheelcontrols.js',
        'js/_modwheelcontrols.js',
        'js/_multiswitchcontrols.js',
        'js/_loadprogramcontrols.js',
        'js/_keyboardcontrols.js',
    ];

gulp.task('dev', function() {
    return gulp.src(scripts)
    .pipe(concat('tanguy.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('prod', function() {
    return gulp.src(scripts)
    .pipe(concat('tanguy.js'))
    .pipe(gulp.dest('tanguy/js/'))
    .pipe(uglify())
    .pipe(gulp.dest('tanguy/js'))
});

gulp.task('sass', function() {
    return gulp.src('css/*.scss')
    .pipe(sass())
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('css/'));
});