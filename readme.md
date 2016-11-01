# Frontend Bootstrap

## How to: Setup development environment
1. Make sure the following is installed on your machine:
    - [Node.js](http://nodejs.org/)
2. Run this command to install the global dependencies:
    ```
    npm install -g gulp
    ```
3. Run these commands to install the project-specific dependencies:
    ```
    npm install
    ```
4. Done! You can now start your development server.

## How to: Configure module loader
By default, the bootstrap uses Browserify to bundle all available components into one file starting at the default entry point **src/static/bundle.js**.

### Defining additional bundles:
1. Open config.js and navigate to the js section
2. Add an additional object to the bundles array
```
{
    entry: '',      // Path to the js es6 entry file for the bundle
    bundle: '',     // The name of the bundled file
    components: []  // Array of components that should be included in the bundle
}
```
If you specify additional bundles make sure you define the components for each bundle.

### Switch to RequireJS
If you want to use RequireJS instead of Browserify, just change the 'moduleLoader' setting in config.js
```
moduleLoader: 'requirejs', // browserify || requirejs
```
RequireJS uses **src/static/main.js** instead of **src/static/bundle.js**

## How to: Start the development server
```
gulp dev
```
Then point your browser to `http://localhost:3000/`

## How to: Build
```
gulp dist
```

## How to: Linting
```
gulp lint
```
The linting tools currently cover:
- JavaScript code linting
- Sass file code linting


## How to: Unit tests
```
gulp test
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
gulp upload
```

## How to: Component library
Components are visible in the component library when they contain a YAML (.yml) file.
The YAML file should have the same name as the component's .html file and contains the following parameters:
```
title: Title of the component shown in the library
description: Component description text
demo: |
  <div style="width:100%;height:200px;background:#f2f2f2">{}</div>
implementation: Implementation instructions
```
Note that `demo` should at least contain `{}` as this gets replaced with the component's HTML.
The component is rendered for each `{}` you provide within the demo parameter.

Components can be nested either with or without a sub-folder. Currently folders can only be nested one level deep.
```
nav/
  nav.html
  nav.yml
  anotherNav.html
  anotherNav.yml
  footerNav/
    footerNav.html
    footerNav.yml
```
