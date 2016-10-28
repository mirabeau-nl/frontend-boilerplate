import pkg from './package.json';
import dotenv from 'dotenv';

dotenv.load({ silent: true });

const base = {
    src: './src',
    dist: './dist',
    docs: './tasks/docs'
};

module.exports = {

    moduleLoader: 'browserify', // browserify || requirejs

    browsersync: {
        server: {
            baseDir: base.dist
        },
        open: false,
        ui: false,
        notify: false
    },

    clean: {
        dist: {
            base: base.dist
        }
    },

    css: {
        autoprefixer: {
            browsers: ['last 1 version', '> 5%']
        },
        src: {
            static: base.src + '/static/scss/**/!(_)*.scss',
            staticAll: base.src + '/static/scss/**/*.scss',
            components: base.src + '/components/**/*.scss'
        },
        dist: {
            base: base.dist + '/static/css'
        }
    },

    docs: {
        src: {
            index: base.docs + '/index.html',
            indexDir: base.docs,
            layoutDir: base.docs + '/layout',
            templates: base.src + '/templates',
            templatesAll: base.src + '/templates/**/**.html',
            statics: base.docs + '/static/**',
            component: base.docs + '/component-detail.html',
            preview: base.docs + '/component-preview.html',
            components: base.src + '/components',
            componentsAll: base.src + '/components/**/*.yml'
        },
        dist: {
            base: base.dist,
            index: base.dist + '/index.html',
            static: base.dist + '/docs/static/',
            sassdocs: base.dist + '/docs/sassdoc',
            components: base.dist + '/docs/components/'
        }
    },

    fonts: {
        src: {
            fonts: base.src + '/static/fonts/**/*'
        },
        dist: {
            fonts: base.dist + '/static/fonts'
        }
    },

    githooks: {
        src: {
            all: './tasks/githooks/*'
        },
        dist: {
            base: './.git/hooks',
            all: './.git/hooks/*'
        }
    },

    html: {
        src: {
            templates: base.src + '/templates/**/*.html',
            templatesDir: base.src + '/templates',
            layout: base.src + '/layout/*.html',
            layoutDir: base.src + '/layout',
            components: base.src + '/components/**/*.html',
            componentsDir: base.src + '/components'
        },
        dist: {
            base: base.dist + '/templates'
        },
        baseUri: '/'
    },

    img: {
        src: {
            all: base.src + '/static/img/**/*.{svg,png,jpg,gif,webp}'
        },
        dist: {
            base: base.dist + '/static/img'
        }
    },

    js: {
        src: {
            all: base.src + '/static/js/**/*.js',
            vendor: base.src + '/static/js/vendor/**/*.js',
            polyfill: base.src + '/static/js/polyfill/**/*.js',
            components: base.src + '/components/**/!(*.Spec).js',
            conditioner: './node_modules/conditioner-js/dist/min/*.js',
            tests: base.src + '/components/**/*.Spec.js',
            main: base.src + '/static/js/main.js',
            componentsDir: base.src + '/components',
        },
        dist: {
            base: base.dist + '/static/js',
            main: base.dist + '/static/js/main.js',
            vendor: base.dist + '/static/js/vendor',
            babelHelpers: base.dist + '/static/js/polyfill/babel-helpers.js'
        },
        bundles: [
            {
                entry: base.src + '/static/js/bundle.js', // Path to the js es6 entry file for the bundle
                bundle: 'main.js', // The name of the bundled file
                components: [] // Components that should be included in the bundle
            }
        ],
        browserify: {
            debug: true,
            insertGlobals: true,
            cache: {},
            paths: ['./src/static/js', './src/components'],
            packageCache: {},
            fullPaths: false
        },
        babelFilter: function(file) {
            return !/vendor|\.Spec\.js/.test(file.path);
        },
        needsCopying: function(file) {
            return !/\.Spec\.js/.test(file.path);
        },
        eslintAutofix: false
    },

    upload: {
        src: {
            all: base.dist + '/**'
        },
        dist: {
            target: '/test',
            base: base.dist
        },
        options: { // Defined in .env file
            host: process.env.UPLOAD_HOST,
            user: process.env.UPLOAD_USER,
            password: process.env.UPLOAD_PASSWORD
        }
    },

    zip: {
        filename: pkg.name + '.zip',
        src: {
            all: base.dist + '/**/!(*.zip)'
        },
        dist: {
            base: base.dist
        }
    }

};
