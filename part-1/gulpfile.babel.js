import { src, dest, watch, series } from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

const server = browserSync.create();

export const serve = (done) => {
  server.init({
    server: {
      baseDir: './',
    },
  });
  done();
};

export const clean = () => {
  return del(['css']);
};

export const styles = () => {
  return src('scss/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('css'))
    .pipe(server.stream());
};

export const watchFiles = () => {
  watch('scss/**/*.scss', styles);
};

export const build = series(clean, styles);
export default series(clean, styles, serve, watchFiles);
