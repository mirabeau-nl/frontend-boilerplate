import config from '../../config';
import * as pathHelpers from 'path';
import yaml from 'js-yaml';
import { nunjucks } from 'gulp-nunjucks-render';
import marked from 'marked';
import fs from 'fs';
import { html as htmlBeautify } from 'js-beautify';
import envManager from './envManager';
import Vinyl from 'vinyl';

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
        let sample = '';
        let sampleData;

        try {
            sampleData = JSON.parse(fs.readFileSync(file.path.replace('.yml', '.json')))
        } catch (error) {
            sampleData = {}
        }

        try {
            sample = htmlBeautify(environment.render(file.path.replace('.yml', '.njk'), { ...sampleData, baseUri: config.html.baseUri }));
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
        let demo = '';
        let data;

        try {
            data = JSON.parse(fs.readFileSync(file.path.replace('.yml', '.json')))
        } catch (error) {
            data = {}
        }

        try {
            demo = environment.render(file.path.replace('.yml', '.njk'), { ...data, baseUri: config.html.baseUri });
            demo = (yml.demo || '{}').replace(/\{\}/g, demo);
        } catch (error) {
            global.console.log(error);
        }

        return environment.render(config.docs.src.preview, { baseUri: config.html.baseUri, demo: demo });

    }

    /**
     * Get the template tree
     * @param {string} baseDir - dir containing the templates
     * @param {string} ext - file extension to look for
     * @param {string} baseUrl - base URL for templates
     * @returns {array} tree - recursive list of item description objects with signature `{ name, url, branches }`
     */
    static getTemplateTree(baseDir, ext = '.njk', baseUrl = '/templates/') {

        const scandir = dir => {
            return fs.readdirSync(dir)

                // Map to Vinyl objects
                .map(file => docsHelpers.toVinyl(`${dir}/${file}`, baseDir))

                // Add some metadata
                .map(file => {
                    file._isLeaf = file.extname === ext;

                    return file;
                })

                // Filter out non-dir and non-leaf nodes
                .filter(file => file.isDirectory() || file._isLeaf)

                // Map nodes to item description objects for use in templates
                .map(file => {
                    const name = file.stem.replace(/[_-]/g, ' ');
                    const url = file._isLeaf && baseUrl + file.relative.replace(ext, '.html');
                    const branches = file.isDirectory() && scandir(file.path);

                    return { name, url, branches };
                });
        };

        return scandir(baseDir);
    }

    /**
     * Get the component tree
     * @param {string} baseDir - dir containing the components
     * @param {string} ext - file extension to look for
     * @param {string} baseUrl - base URL for components
     * @returns {array} tree - recursive list of item description objects with signature `{ name, url, branches }`
     */
    static getComponentTree(baseDir, ext = '.yml', baseUrl = '/docs/components/') {

        const scandir = dir => {
            return fs.readdirSync(dir)

                // Map to Vinyl objects
                .map(file => docsHelpers.toVinyl(`${dir}/${file}`, baseDir))

                // Filter out non-dir nodes
                .filter(file => file.isDirectory())

                // Map nodes to item description objects for use in templates
                .map(file => {

                    // Components are defined by a yaml file, one per directory, with the file name equal to the component's directory name
                    const yamlPath = `${dir}/${file.basename}/${file.basename}${ext}`;
                    let yml;

                    // Try to find this yaml file. Otherwise, it's just a plain dir.
                    try {
                        yml = yaml.safeLoad(fs.readFileSync(yamlPath));
                    } catch (ex) { /* Shut up, eslint */ }

                    const name = yml ? yml.title : file.basename.replace(/[_-]/g, ' ');
                    const url = yml && baseUrl + pathHelpers.relative(baseDir, yamlPath).replace(ext, '.html');

                    // Subtree.
                    const branches = scandir(file.path);

                    // If the node doesn't have branches and also not a URL (no yaml file), we're dealing with an "anonymous" component; filter it out.
                    if (!branches.length && !url) { return null; }

                    //
                    return { name, url, branches };

                })

                // Clean the array
                .filter(x => x);
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

    /**
     * Create a Vinyl object from a file path
     * @param {string} path - file path
     * @param {string} base - base path
     * @returns {Vinyl} - a Vinyl file object
     */
    static toVinyl(path, base) {
        const stat = fs.statSync(path);

        return new Vinyl({ base, path, stat });
    }

}

export default docsHelpers;
