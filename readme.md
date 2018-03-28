# Frontend Boilerplate

## How to: Setup development environment
1. Make sure the following is installed on your machine:
    - [Node.js](http://nodejs.org/)
2. Run these commands to install the project-specific dependencies:
    ```
    npm install
    ```
3. Done! You can now start your development server.

## How to: Configure bundles
By default, the boilerplate uses Browserify to bundle all direct childs of the `/src/static/js` in their own bundle. To import a whole directory into your bundle, make it importable via an index.js file:
```
export default require('./**/!(*.Spec).js', { mode: 'hash', resolve: ['reduce', 'strip-ext'] });
```

## How to: Including external dependencies
To include external dependencies in your procect, you can either install them as runtime dependency using `npm i --save` or import them directly from a vendor folder.

## How to: Run ConditionerJS instead of Vanilla
if you want to run conditioner:
1. Run `npm i conditioner-js --save`
2. Remove the manual init code block in main.js
3. Uncomment the conditioner init code block in main.js
4. Enjoy

## How to: Start the development server
```
npm run dev
```
Then point your browser to `http://localhost:3000/`

## How to: Build
```
npm run dist
```

## How to: Linting
```
npm run lint
```
The linting tools currently cover:
- JavaScript code linting
- Sass file code linting


## How to: Unit tests
```
npm run test
```
Javascript files in the component folder ending with `.Spec.js` will be run through Mocha.

## How to: Upload
Add a `.env` file to the project root with your FTP credentials:
```
UPLOAD_HOST=ftp.example.org
UPLOAD_USER=username
UPLOAD_PASSWORD=password
```
Then run:
```
npm run upload
```

## How to: Component library
Components are visible in the component library when they contain a YAML (.yml) file.
The YAML file should have the same name as the component's .njk file and contains the following parameters:
```
title: Title of the component shown in the library
description: Component description text
demo: |
  <div style="width:100%;height:200px;background:#f2f2f2">{}</div>
implementation: Implementation instructions
```
Note that `demo` should at least contain `{}` as this gets replaced with the component's HTML.
The component is rendered for each `{}` you provide within the demo parameter.

Components can be nested either with or without a sub-folder. Sub-folders can go to any depth.
```
nav/
  nav.njk
  nav.yml
  anotherNav.njk
  anotherNav.yml
  footerNav/
    footerNav.njk
    footerNav.yml
```

### Component tag
A custom Nunjucks tag is available as a convenience for loading external JSON data into a component:
```
{% component 'component-name' %}
```

If the component has an accompanying JSON file with the same name, its contents will be loaded and provided automatically, scoped to just the component.

You can also augment the data set by providing a POJO (Plain Old JavaScript Object) as the second parameter:
```
{% component 'component-name', { cookies: '… are delicious!' } %}
```

This is especially useful for overriding the default data for a component with template data:
```
{% component 'component-name', componentName %}
```
… where `componentName` is an object from the template's data set.

Finally, you can also provide an alternative data source as the second parameter — this is great for component variations, for example. First, the component directory is looked in for the provided path:
```
{% component 'component-name', 'component-name-variation.json' %}
```

After that, the path is looked for from the project base:
```
{% component 'component-name', '/data/my-custom-data.json' %}
```

If the component resides in a nested folder, simply write out the path to it. For example:
```
{% component 'my-sub-folder/component-name' %}
```

## Templates
Like components, templates can be nested inside of sub-folders to any depth. Also like components, templates that have an accompanying JSON file will have it automatically loaded and provided as template data.

## includeData plugin
In case the above isn't enough at some point, the [includeData plugin](https://github.com/VincentLeung/nunjucks-includeData) is available for even more freedom in including data from external JSON files. Refer to its documentation for details.
