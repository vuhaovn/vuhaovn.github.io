var gulp = require("gulp");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

gulp.task("serve", [], function() {
	browserSync({
		notify: false,
		server: {
			baseDir: '.'
		}
	});
	gulp.watch(['**/*.html'], reload);
	gulp.watch(['**/js/*.js'], reload);
});

gulp.task("default", ["serve"]);
