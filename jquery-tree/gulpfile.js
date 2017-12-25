var gulp = require("gulp");
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task("server", function() {
	browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });

  gulp.watch(['*.html'], reload);
  gulp.watch(['js/*.js'], reload);
  gulp.watch(['css/*.css'], reload);
})

gulp.task("default", ["server"]);