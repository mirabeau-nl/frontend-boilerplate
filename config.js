'use strict';

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
        browsersync: {
            baseDir:        base.dist
        },
        css: {
            globStatic:     base.src + '/static/scss/**/!(_)*.scss',
            globStaticAll:  base.src + '/static/scss/**/*.scss',
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
            globGithooks:   './githooks/*',
            globDist:       './.git/hooks/*',
            dirDist:        './.git/hooks'
        }

    }
};
