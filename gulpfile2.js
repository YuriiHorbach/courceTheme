'use strict';

var gulp = require('gulp'),
		mainBowerFiles = require('main-bower-files'),
		watch = require('gulp-watch'),
		sass = require('gulp-sass'),
		imagemin = require('gulp-imagemin'),

var path = {
vendor: {
	js: 'assets/js/',
	css: 'assets/css/'
},
dist: { //Тут мы укажем куда складывать готовые после сборки файлы
	html: 'build/',
	js: 'build/js/',
	scss: 'build/css/',
	css: 'build/css/',
	img: 'build/img/',
	fonts: 'build/fonts/'
},
app: { //Пути откуда брать исходники
	html: 'assets/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
	js: 'assets/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
	scss: 'assets/css/**/*.scss',
	css: 'assets/css/**/*.css',
	img: 'assets/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
	fonts: 'assets/fonts/**/*.*'
},
watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
	html: 'assets/**/*.html',
	js: 'assets/js/**/*.js',
	scss: 'assets/css/**/*.scss',
	css: 'assets/css/**/*.css',
	img: 'assets/img/**/*.*',
	fonts: 'assets/fonts/**/*.*'
},
clean: './dist'
};


gulp.task('vendorJs:build', function () {
		gulp.src( mainBowerFiles('**/*.js') ) //Выберем файлы по нужному пути
		.pipe(gulp.dest(path.vendor.js)) //Выплюнем готовый файл в app
});

gulp.task('vendorCss:build', function () {
		gulp.src( mainBowerFiles('**/*.css') ) //Выберем файлы по нужному пути
		.pipe(gulp.dest(path.vendor.css)) //И в app
});

gulp.task('html:build', function () {
		gulp.src(path.app.html) //Выберем файлы по нужному пути
		.pipe(gulp.dest(path.dist.html)) //Выплюнем их в папку build
		.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
		gulp.src(path.app.js) //Найдем наш main файл
		.pipe(sourcemaps.init()) //Инициализируем sourcemap
		/*.pipe(uglify()) //Сожмем наш js*/
		.pipe(gulp.dest(path.dist.js)) //Выплюнем готовый файл в build
		.pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('scss:build', function () {
		gulp.src(path.app.scss) //Выберем наш main.scss
		.pipe(sourcemaps.init()) //То же самое что и с js
		.pipe(sass()) //Скомпилируем
		.pipe(gulp.dest(path.dist.scss)) //И в build
		.pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
		gulp.src(path.app.css) //Выберем наш main.css
		.pipe(gulp.dest(path.dist.css)) //И в build
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
		gulp.src(path.app.img) //Выберем наши картинки
		.pipe(imagemin({ //Сожмем их
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()],
		interlaced: true
		}))
		.pipe(gulp.dest(path.dist.img)) //И бросим в build
		.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
		gulp.src(path.app.fonts)
		.pipe(gulp.dest(path.dist.fonts))
});


gulp.task('build', [
	'vendorCss:build',
	'vendorJs:build',
	'html:build',
	'js:build',
	'scss:build',
	'css:build',
	'fonts:build',
	'image:build'
]);


gulp.task('watch', function(){
		watch([path.watch.html], function(event, cb) {
			gulp.start('html:build');
		});
		watch([path.watch.scss], function(event, cb) {
			gulp.start('scss:build');
		});
		watch([path.watch.css], function(event, cb) {
			gulp.start('css:build');
		});
		watch([path.watch.js], function(event, cb) {
			gulp.start('js:build');
		});
		watch([path.watch.img], function(event, cb) {
			gulp.start('image:build');
		});
		watch([path.watch.fonts], function(event, cb) {
			gulp.start('fonts:build');
		});
}); 




gulp.task('default', ['build', 'webserver', 'watch']);

