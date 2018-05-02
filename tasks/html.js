import { html as config } from '../config';
import { reload } from 'browser-sync';
import gulp from 'gulp';
import render from 'gulp-nunjucks-render';
import watch from 'gulp-watch';
import envManager from './util/envManager';
import data from 'gulp-data';
import fs from 'fs';

// If a template has a .json file with the same name in the same location, load it as a data source
const getDataForFile = file => {
    try {
        return JSON.parse(fs.readFileSync(file.path.replace('.njk', '.json')));
    } catch (error) {
        return {};
    }
};

/**
 * Task: HTML Compile
 */
gulp.task('html', () => {
    return gulp.src(config.src.templates)
        .pipe(data(getDataForFile))
        .pipe(render({
            path: [
                config.src.templatesDir,
                config.src.layoutDir,
                config.src.componentsDir
            ],
            manageEnv: envManager
        }))
        .pipe(gulp.dest(config.dist.base))
        .on('end', reload);
});

/**
 * Task: HTML Watch
 */
gulp.task('html-watch', cb => {
    const paths = config.src;
    watch([
        paths.templates,
        paths.templatesData,
        paths.layout,
        paths.components,
        paths.componentsData
    ], () => gulp.start(['html'], cb));
});
