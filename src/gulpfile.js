var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var pkg = require('./package.json');
var dirs = pkg['dev-configs'].directories;
var jsDirs = [dirs.src + '/js/*.js', dirs.src+'/js/**/*.js'];
var cssDirs = [dirs.src + '/css/**/*.css'];

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');



gulp.task('js', function() {
    browserify({
        entries: dirs.src + '/js/main.js',
        debug: true
    })
    .transform(babelify.configure({
        presets: ["es2015", "react"]
    }))
    .bundle()
    .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest(dirs.dist + "/js"));
});

var postcssMixins = require('postcss-mixins');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var cssMqpacker = require('css-mqpacker');
var postcssNested = require('postcss-nested');
var postcssVariables = require('postcss-css-variables');
var postcssInherit  = require('postcss-inherit');

gulp.task('css', function () {
    var processors = [
        postcssImport({
            from: dirs.src + '/css/main.css'
        }),
        postcssMixins,
        postcssVariables,
        postcssNested,
        postcssInherit,
        cssMqpacker,
        autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
        }),
     ];
    return gulp.src(dirs.src + '/css/main.css')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.postcss(processors))
        .on('error', function (err) {
                console.log(err.toString());
                this.emit("end");
        })
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.dist + '/css'))
});

var jslibs = 

gulp.task('copy', function() {
    gulp.src([
            'app/images/*',
        ])
        .pipe(gulp.dest(dirs.dist + '/images/'))
    gulp.src([
            'node_modules/font-awesome/fonts/*',
        ])
        .pipe(gulp.dest(dirs.dist + '/fonts/'))
    gulp.src([
            'node_modules/font-awesome/css/font-awesome.min.css',
        ])
        .pipe(plugins.concat("vendor.css"))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(dirs.dist + '/css/'))
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'app/js/theme/*',
        ])
        .pipe(plugins.concat("lib.js"))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + '/js/'));
});

gulp.task('build', ['css'], function() {
    gulp.src(dirs.dist + "/js/main.js")
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + '/js/'));
    gulp.src(dirs.dist + "/css/main.css")
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(dirs.dist + '/css/'));
})

gulp.task('watch', function() {
    gulp.watch(jsDirs, ['js']);
    gulp.watch(cssDirs, ['css']);
    gulp.watch(dirs.dist + '/css/main.css', function(files){
        plugins.livereload.changed(files)
    });
})

gulp.task('default', ['watch', 'js', 'css'], function() {
    plugins.livereload.listen();
});
