# Frontend Bootstrap Migration Guide

## When not to update
This new version introduces a couple of breaking changes. When not to update:
  - If you rely on RequireJS: module loading through RequireJS has been deprecated in favour of Browserify
  - If you rely on stage-0 JavaScript, `.babelrc` has been updated to use `stage-2` to prevent breaking changes due to changes in ES.  

## ConditionerJS users
If you rely on ConditionerJS API or monitors, check the readme file to see how to add ConditionerJS back into your project.

## Updating
1. Make a back-up of your project
2. Overwrite or add the following files and folders
  - /tasks
  - .babelrc
  - config.js
  - package.json
  - /src/static/js/main.js
  - /src/static/js/polyfill.js
  - /src/components/index.js
3. Update your code to handle new options syntax:
  - Options are given through seperate data attributes:

    ```
    <div data-triggers="id1" data-foo="bar">
    ```
    instead of 
    ```
    <div data-options='{"triggers":"id1", "foo":"bar"}>
    ```
  - Options are always passed as string, instead of being parsed by JSON.parse:
  
    ```
    <div data-options={"bool":true}>
    ```
    Using this old syntax, `bool === true`.
    In the new `data-bool="true"` syntax, `bool === 'true'` (notice the quotes).
3. If you changed **/src/layout/default.html** update the script initialization to match:

  ```
  <script>
      (function(d){

          if (!('querySelector' in d && 'addEventListener' in window)) return;

          d.documentElement.className += ' has-js';

          function load(src, dep) {
              var s = d.createElement('script');
              s.src = src;
              s.onload = function() { dep && load(dep) };
              s.onerror = console.error;
              d.head.appendChild(s);
          }

          var supported =
              'Symbol' in window &&
              'Promise' in window &&
              'assign' in Object &&
              'from' in Array &&
              'dataset' in document.createElement('div') &&
              Symbol.iterator in NodeList.prototype;

          load('/static/js/babel-helpers.js');

          if (supported) {
              load('/static/js/main.js');
          } else {
              load('/static/js/polyfill.js', '/static/js/main.js')
          }

      }(document));
  </script>
  ```
  *Don't forget to update `/src/tasks/docs/layout/preview.html` as well!*
4. This version uses Nunjucks instead of Swig, just as the previous version. If you didn't update yet, see https://medium.com/engineers-optimizely/js-templating-transitioning-from-swig-to-nunjucks-ac0e94d1794b#.mf2ddbl2v for a review of syntax changes

5. Install node dependencies
```
npm install
```
