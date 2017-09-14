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

## How to: Configure bundles
By default, the bootstrap uses Browserify to bundle all direct childs of the `/src/static/js` in their own bundle. To import a whole directory into your bundle, make it importable via an index.js file: 
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

Components can be nested either with or without a sub-folder. Currently folders can only be nested one level deep.
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
