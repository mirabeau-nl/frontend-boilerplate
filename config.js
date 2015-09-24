'use strict';

var pkg = require('./package.json');

var base = {
    src:  './src',
    dist: './dist'
};

module.exports = {
    autoprefixer: {
        browsers: ['last 1 version', '> 5%']
    },

    /**
     * Paths needed for Gulp
     */
    paths: {
        clean: {
            dirDest: base.dist
        },
        browsersync: {
            baseDir:        base.dist
        },
        css: {
            globStatic:     base.src + '/static/scss/**/!(_)*.scss',
            globStaticAll:  base.src + '/static/scss/**/*.scss',
            globFonts:      base.src + '/static/fonts/*',
            dirDistFonts:   base.dist + '/static/fonts',
            globComponents: base.src + '/components/**/*.scss',
            dirDist:        base.dist + '/static/css',
            sassdocsDist:   base.dist + '/docs/sassdoc'
        },
        html: {
            globTemplates:  base.src + '/templates/**/*.html',
            globLayout:     base.src + '/layout/*.html',
            globComponents: base.src + '/components/**/*.html',
            dirDist:        base.dist + '/templates'
        },
        img: {
            globImages:     base.src + '/static/img/**/*.{svg,png,jpg,gif,webp}',
            dirDist:        base.dist + '/static/img'
        },
        js: {
            vendorFilter:   function(file) { return !/vendor/.test(file.path); },
            globStatic:     base.src + '/static/js/**/*.js',
            globVendor:     base.src + '/static/js/vendor/**/*.js',
            globComponents: base.src + '/components/**/*.js',
            dirDist:        base.dist + '/static/js'
        },
        githooks: {
            globGithooks:   './tasks/githooks/*',
            globDist:       './.git/hooks/*',
            dirDist:        './.git/hooks'
        }
    },
    zip: {
        paths: {
            globDist:       base.dist + '/**/!(*.zip)',
            dirDist:        base.dist
        },
        filename: pkg.name + '.zip'
    },

    /**
     * Upload
     * HOST, USER and PASSWORD constants should be defined within .env file
     */
    upload: {
        globDist: base.dist + '/**',
        targetPath: '/test',
        targetBase: base.dist,
        options: {
            host: process.env.UPLOAD_HOST,
            user: process.env.UPLOAD_USER,
            password: process.env.UPLOAD_PASSWORD
        }
    }

};
