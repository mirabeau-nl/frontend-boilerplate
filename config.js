var pkg = require('./package.json');

var base = {
    src:  './src',
    dist: './dist',
    docs: './tasks/docs'
};

module.exports = {

    browsersync: {
        dist: {
            base: base.dist
        }
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
            fonts: base.src + '/static/fonts/*',
            components: base.src + '/components/**/*.scss'
        },
        dist: {
            base: base.dist + '/static/css',
            fonts: base.dist + '/static/fonts',
            sassdocs: base.dist + '/docs/sassdoc'
        }
    },

    docs: {
        src: {
            index: base.docs + '/index.html',
            templates: base.src + '/templates',
            templatesAll: base.src + '/templates/**/**.html',
            statics: base.docs + '/static/**'
        },
        dist: {
            base: base.dist,
            index: base.dist + '/index.html',
            static: base.dist + '/docs/static/'
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
            layout: base.src + '/layout/*.html',
            components: base.src + '/components/**/*.html'
        },
        dist: {
            base: base.dist + '/templates'
        }
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
            components: base.src + '/components/**/*.js'
        },
        dist: {
            base: base.dist + '/static/js'
        },
        vendorFilter: function(file) {
            return !/vendor/.test(file.path);
        }
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
