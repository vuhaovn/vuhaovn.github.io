var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var livereload = require("gulp-livereload");
var reload = browserSync.reload;

gulp.task("serve", [], function() {
	browserSync({
		notify: false,
		server: {
			baseDir: '.'
		}
	});
	gulp.watch(["**/*.html"], reload);
	gulp.watch(["**/js/*.js"], reload);
	gulp.watch(["**/css/*.css"], reload);
});

gulp.task("sass", function() {
	return gulp.src("share/scss/style.scss")
		.pipe(sass())
		.pipe(gulp.dest("share/css"))
		.pipe(livereload());
});

gulp.task("watch", function () {
	livereload.listen();
	gulp.watch(["share/scss/style.scss"], ["sass"]);
});

gulp.task("default", ["serve", "sass", "watch"]);
