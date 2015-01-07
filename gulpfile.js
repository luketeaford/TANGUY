var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    jslint = require('gulp-jslint'),
    uglify = require('gulp-uglify'),
    prettydata = require('gulp-pretty-data'),
    jsonminify = require('gulp-jsonminify'),
    sass = require('gulp-ruby-sass'),
    minifyhtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),

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
        'js/_slidercontrols.js',
        'js/_buttoncontrols.js',
        'js/_storeprogram.js',
        'js/_keyboardcontrols.js'
    ];

gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('js', function () {
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
});

gulp.task('html', function () {
    return gulp.src('*.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('tanguy/'))
});

gulp.task('images', function () {
    return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('tanguy/images'))
});

gulp.task('watchSAFE', function () {
    gulp.watch('js/*.js', ['js']);
    gulp.watch('programs/*.json', ['presets']);
    gulp.watch('css/**/*.scss', ['sass']);
    gulp.watch('*.html', ['html']);
    gulp.watch('images/*', ['images']);
});

gulp.task('watch', function () {
    gulp.watch("js/*.js", ['js', browsersync.reload]);
    gulp.watch('programs/*.json', ['presets', browsersync.reload]);
    gulp.watch('css/**/*.scss', ['sass', browsersync.reload]);
    gulp.watch('*.html', ['html', browsersync.reload]);
    gulp.watch('images/*', ['images', browsersync.reload]);
});

gulp.task('default', ['browsersync', 'watch']);


//gulp.task('default', ['browsersync'], function () {
//    gulp.watch("js/*.js", ['js', browsersync.reload]);
//    gulp.watch('programs/*.json', ['presets', browsersync.reload]);
//    gulp.watch('css/**/*.scss', ['sass', browsersync.reload]);
//    gulp.watch('*.html', ['html', browsersync.reload]);
//    gulp.watch('images/*', ['images', browsersync.reload]);
//});
