# Frontend Bootstrap Migration Guide

## Browserify version
1. Make a back-up of your project
2. Overwrite or add the following files and folders
  - /tasks
  - .babelrc
  - config.js
  - package.json
  - /src/static/js/bundle.js
3. If you changed **/src/layout/default.html** note the following changes:

  ```diff
  - s.setAttribute('src', '../static/js/vendor/requirejs/require.js');
  - s.setAttribute('data-main', '../static/js/main');
  - d.body.appendChild(s);
  + {# Append the right script tag for the used module loader #}
  + {% if moduleLoader == 'browserify' %}
  +   var b = d.createElement('script');
  +   b.setAttribute('src', '/static/js/polyfill/babel-helpers.js'); // separate helpers file when using browserify
  +   d.body.appendChild(b);
  +   s.setAttribute('src', '/static/js/main.js'); // main.js bunle
  +   d.body.appendChild(s);
  + {% elseif moduleLoader == 'requirejs' %}
  +   s.setAttribute('src', '../static/js/vendor/requirejs/require.js');
  +   s.setAttribute('data-main', '../static/js/main');
  +   d.body.appendChild(s);
  + {% endif %}
  ```
4. This version uses Nunjucks instead of Swig. Nunjucks has some minor syntax differences, so after updating you have to check your template files. See https://medium.com/engineers-optimizely/js-templating-transitioning-from-swig-to-nunjucks-ac0e94d1794b#.mf2ddbl2v for a review of syntax changes

5. Install node dependencies
```
npm install
```
