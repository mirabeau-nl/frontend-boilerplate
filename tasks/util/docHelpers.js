import config from '../../config';
import { sync as glob } from 'glob';
import { relative, sep, dirname } from 'path';
import yaml from 'js-yaml';
import { nunjucks } from 'gulp-nunjucks-render';
import marked from 'marked';
import fs from 'fs';

/**
 * Doc task helper functions
 */
class docsHelpers {

    /**
     * Render component
     * @param {Buffer} content - File content
     * @param {File} file - File object
     * @returns {string} component - rendered component
     */
    static renderComponent(content, file) {
        const yml = yaml.load(content);
        const locals = Object.assign(yml.data || {}, { baseUri: config.html.baseUri.demo });
        const dir = dirname(file.path);
        const sources = [];

        if (yml.viewsource) {
            yml.viewsource.forEach(source => {
                try {
                    sources.push({
                        filename: source,
                        code: nunjucks.render(`${dir}${sep}${source}`, locals),
                        type: source.split('.').pop()
                    });
                } catch (error) {
                    global.console.log(error);
                }
            });
        }

        const data = {
            title: yml.title,
            description: marked(yml.description || ''),
            implementation: marked(yml.implementation || '').replace('<table', '<table class="table"'),
            demo: file.path.split(sep).pop().replace('.yml', '.demo.html'),
            sources: sources,
            baseUri: locals.baseUri
        };

        return nunjucks.render(config.docs.src.component, data);
    }

    /**
     * Render component demo
     * @param {Buffer} content - File content
     * @param {File} file - File object
     * @returns {string} component - rendered component
     */
    static renderComponentDemo(content, file) {
        const yml = yaml.load(content);
        const baseUri = config.html.baseUri.demo;
        const locals = Object.assign(yml.data || {}, { baseUri: baseUri });
        let demo = '';

        try {
            demo = nunjucks.render(file.path.replace('.yml', '.html'), locals);
            demo = (yml.demo || '{}').replace(/\{\}/g, demo);
        } catch (error) {
            global.console.log(error);
        }

        return nunjucks.render(config.docs.src.demo, { baseUri: baseUri, demo: demo });

    }

    /**
     * Get relative paths
     * @param {string} globString - glob pattern for the files
     * @param {string} relativeTo - dir name
     * @returns {Array} paths - array of relative paths
     */
    static getRelativePaths(globString, relativeTo) {
        return glob(globString, { nosort: true }).map(dir => relative(relativeTo, dir));
    }

    /**
     * Get the component tree
     * @param {string} globString - glob pattern for the component files
     * @param {string} relativeTo - dir containing the files in globString
     * @returns {Object} tree - object with alle components and children
     */
    static getComponentTree(globString, relativeTo) {

        const files = docsHelpers.getRelativePaths(globString, relativeTo);

        return files.reduce((tree, file) => {
            const yml = yaml.safeLoad(fs.readFileSync(`${config.docs.src.components}/${file}`)) || false;

            if (typeof yml === 'object') {
                const path = file.split(sep)[0];
                const name = yml.title;

                tree[path] = tree[path] || {};
                tree[path].variations = tree[path].variations || [];
                tree[path].variations.push({ url: file.replace('.yml', '.html'), name: name });
            }

            return tree;

        }, {});
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
