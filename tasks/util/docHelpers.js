import config from '../../config';
import * as pathHelpers from 'path';
import yaml from 'js-yaml';
import { nunjucks } from 'gulp-nunjucks-render';
import marked from 'marked';
import fs from 'fs';
import { html as htmlBeautify } from 'js-beautify';
import envManager from './envManager';

/**
 * Doc task helper functions
 */
class docsHelpers {

    /**
     * Create nunjucks environment
     * @return {object} environment
     */
    static createEnvironment() {
        const paths = [
            config.docs.src.indexDir,
            config.docs.src.layoutDir,
            config.docs.src.components,
            config.html.src.layoutDir,
            config.html.src.componentsDir
        ];
        const loaders = paths.map(path => new nunjucks.FileSystemLoader(path));
        const environment = new nunjucks.Environment(loaders);
        envManager(environment);

        return environment;
    }

    /**
     * Render component
     * @param {Buffer} content - File content
     * @param {File} file - File object
     * @returns {string} component - rendered component
     */
    static renderComponent(content, file) {
        const environment = docsHelpers.createEnvironment();
        const yml = yaml.load(content);
        const locals = Object.assign(yml.data || '{}', { baseUri: config.html.baseUri });
        let sample = '';

        try {
            sample = htmlBeautify(environment.render(file.path.replace('.yml', '.njk'), locals));
        } catch (error) {
            global.console.log(error);
        }

        const data = {
            title: yml.title,
            description: marked(yml.description || ''),
            implementation: marked(yml.implementation || '').replace('<table', '<table class="table"'),
            demo: file.path.split(pathHelpers.sep).pop().replace('.yml', '.demo.html'),
            sample: sample
        };

        return environment.render(config.docs.src.component, data);

    }

    /**
     * Render component demo
     * @param {Buffer} content - File content
     * @param {File} file - File object
     * @returns {string} component - rendered component
     */
    static renderComponentDemo(content, file) {
        const environment = docsHelpers.createEnvironment();
        const yml = yaml.load(content);
        const locals = Object.assign(yml.data || '{}', { baseUri: config.html.baseUri });
        let demo = '';

        try {
            demo = environment.render(file.path.replace('.yml', '.njk'), locals);
            demo = (yml.demo || '{}').replace(/\{\}/g, demo);
        } catch (error) {
            global.console.log(error);
        }

        return environment.render(config.docs.src.preview, { baseUri: config.html.baseUri, demo: demo });

    }

    /**
     * Get the template tree - convenience function for calling `getTree` with template configuration
     * @param {string} baseDir - dir containing the templates
     * @param {string} ext - file extension
     * @returns {Object} tree - the result of `getTree` with the given arguments
     */
    static getTemplateTree(baseDir, ext = '.njk') {

        return docsHelpers.getTree(baseDir, {
            pathPrefix: '/templates/',
            ext: ext,
            nameCb: path => pathHelpers.basename(path, ext).replace(/[_-]/g, ' ')
        });

    }

    /**
     * Get the component tree - convenience function for calling `getTree` with component configuration
     * @param {string} baseDir - dir containing the components
     * @param {string} ext - file extension
     * @returns {Object} tree - the result of `getTree` with the given arguments
     */
    static getComponentTree(baseDir, ext = '.yml') {

        return docsHelpers.getTree(baseDir, {
            pathPrefix: '/docs/components/',
            ext: ext,
            dirIsLeaf: true,
            nameCb: path => yaml.safeLoad(fs.readFileSync(path)).title,
            effectivePathCb: (path, file) => {
                const effectivePath = `${path}/${file}${ext}`;
                try {
                    fs.accessSync(effectivePath, fs.constants.R_OK);

                    return effectivePath;
                } catch (ex) { /* Shut up, eslint */ }

                return null;
            }
        });

    }

    /**
     * Get the template or component tree
     * @param {string} baseDir - dir containing the items
     * @param {object}   conf - config object
     * @param {string}   conf.pathPrefix - path prefix for the hrefs
     * @param {ext}      conf.ext - file extension to look for
     * @param {boolean}  [conf.dirIsLeaf=false] - whether to treat each directory as one item (leaf)
     * @param {function} conf.nameCb - callback to determine the display name of an item
     * @param {string}   conf.nameCb.path - the path to the directory of the current item
     * @param {function} [conf.effectivePathCb] - callback to determine effective path for the item; useful when `dirIsLeaf === true`
     * @param {function} conf.effectivePathCb.path - the path to the directory of the current item
     * @param {function} conf.effectivePathCb.file - the filename of the current item
     * @returns {array} tree - recursive list of item description objects with signature `{ name, url, branches }`
     */
    static getTree(baseDir, conf) {
        const scandir = dir => {
            return fs.readdirSync(dir).map(file => {
                const path = `${dir}/${file}`;
                const isDir = fs.statSync(path).isDirectory();
                const isLeaf = !conf.dirIsLeaf && !isDir && pathHelpers.extname(file) === conf.ext;
                if (!isDir && !isLeaf) { return null; }
                const effectivePath = conf.effectivePathCb && conf.effectivePathCb(path, file);
                const href = conf.pathPrefix + pathHelpers.relative(baseDir, effectivePath || path);
                const url = (isLeaf || effectivePath) && href.replace(conf.ext, '.html');
                const name = isLeaf || effectivePath ? conf.nameCb(effectivePath || path) : file.replace(/[_-]/g, ' ');

                return { name: name, url: url, branches: isDir && scandir(path) };
            // Clean up
            }).filter(x => x);
        };

        return scandir(baseDir);
    }

    /**
     * Check if a yaml file has content
     * @param {VinylObject} file -
     * @returns {Boolean} hasContent -
     */
    static hasContent(file) {
        return typeof yaml.safeLoad(file.contents) === 'object';
    }

}

export default docsHelpers;
