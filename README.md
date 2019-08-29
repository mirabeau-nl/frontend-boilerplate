![Logo](frontend-boilerplate.svg)

[![Build Status](https://travis-ci.org/mirabeau-nl/frontend-boilerplate.svg?branch=master)](https://travis-ci.org/mirabeau-nl/frontend-boilerplate)

[We're hiring!](https://www.werkenbijmirabeau.nl/en) ✨

This project is a highly opinionated boilerplate that can be used to quickly kickstart a new web development project. It's built on modern tools such as Gulp, Babel, and Browsersync. Using the boilerplate will help you stay productive by eliminating bikeshedding and by encouraging testing.

## 📖 Table of contents

- [📖 Table of contents](#%F0%9F%93%96-table-of-contents)
- [💫 Features](#%F0%9F%92%AB-features)
- [🚀 Quickstart](#%F0%9F%9A%80-quickstart)
- [➡️ Getting started](#%E2%9E%A1%EF%B8%8F-getting-started)
  - [Set up your development environment](#set-up-your-development-environment)
  - [Creating new components](#creating-new-components)
  - [Creating new templates](#creating-new-templates)
  - [Linting and testing](#linting-and-testing)
  - [Building and uploading](#building-and-uploading)
- [🕹 Extending the boilerplate](#%F0%9F%95%B9-extending-the-boilerplate)
  - [How to: Configure bundles](#how-to-configure-bundles)
  - [How to: Including external dependencies](#how-to-including-external-dependencies)
  - [How to: Run ConditionerJS💆‍♀️ instead of Vanilla](#how-to-run-conditionerjs%F0%9F%92%86%E2%80%8D%E2%99%80%EF%B8%8F-instead-of-vanilla)
- [📚 Using the component library](#%F0%9F%93%9A-using-the-component-library)
- [🏷 Using the custom Nunjucks component tag](#%F0%9F%8F%B7-using-the-custom-nunjucks-component-tag)
  - [Templates](#templates)
  - [includeData plugin](#includedata-plugin)

## 💫 Features

- A live-reloading server with [Browsersync](https://browsersync.io/)
- Automated build process that includes, but is not limited to: SCSS compilation, JavaScript transpiling, and image optimization
- Create documentation easy and almost automatically by simply adding a `.yml` file to your component folders
- Linting with [ESLint](https://eslint.org/) and [Stylelint](https://github.com/stylelint/stylelint)
- Sourcemaps
- Custom Nunjucks tags that allow external JSON loading into components, keeping your data and views clean and separate

## 🚀 Quickstart

1. Clone this repo
2. Run `npm run dev` and point your browser to `localhost:3000`
3. Lint and test by running `npm run codequality` and `npm run test`
4. Build by running `npm run dist`
5. Upload by adding a `.env` file to your project root with your FTP credentials, and run `npm run upload`

## ➡️ Getting started

This boilerplate utilizes Gulp heavily to automate tasks and manage frontend dependencies. If you're new to Gulp, here's a [starter guide](https://css-tricks.com/gulp-for-beginners/).

### Set up your development environment

1. Make sure you have NodeJS installed in your machine. For detailed instructions, see:
   - [Installing Node](https://nodejs.org/en/download/package-manager/)
2. Clone the project to your computer using:
   ```
   git@github.com:mirabeau-nl/frontend-boilerplate.git
   ```
3. Navigate to your new folder and run this command to install the project-specific dependencies:
   ```
   npm install
   ```
4. Done! You can now start your development server by running `npm run dev`. This command will start a local server, located at `http://localhost:3000`.

Note: optionally, you can run the development server in https mode without certificates by passing the `--https` flag. If you have to use certificates you can pass them in `config.js` under 'browsersync'.

It's important to realize that this boilerplate distinguishes between `components` and `templates`. A component (located in `src/components`) is just that, a component. It could be a menu, or a list of items. A template (located in `src/templates`) is a collection of components.

What you'll see when opening your brand new server in a browser is a list of all your components and templates. There is no 'Hello World' located in the index file - open up `home.njk` to see the components come together.

### Creating new components

Components are located in the `src/components` folder. As you can see, we've included 2 components that you can edit to your liking. Creating a new component is as simple as creating a new folder and adding a `componentName.njk` file. SCSS files of the same name should be added to the same folder, and must also be called in `src/static/scss/all.scss`.

If your component utilizes JavaScript, you can load it using HTML data-attributes. For example, `<div class="foo" data-module="folder/ModuleName">` will initialize `/src/folder/ModuleName.js` on your `foo` div.

The best way to get acquinted with the boilerplate is playing around with it! Try adding new components and changing old ones.

### Creating new templates

Frontend Boilerplate uses Nunjucks as a templating language. Elements that should return on every page, such as `<title>` and `<meta>`, can be found in `src/layout/default.njk`. Other templates will extend from this default template.

### Mock data

All assets that don't belong directly to the interface but are used for mocking content can be placed in the `src/mock` folder. Some examples are audio, video, images and json data for network requests. The mock folder is watched when running `npm run dev` and it's content is copied to the `dist/mock` folder when added or changed.

### Linting and testing

The codestyle task supports `*.{md,css,scss,js,json}` files and automatically formats the code. The codequality task supports `*.{scss,js}` files. You can update the codestyle with `npm run codequality` or use the build-in functionality of your IDE which auto formats your code on save.

The linting tools currently check JavaScript code linting using Prettier and ESLint, and SCSS file code linting using Prettier/Stylelint. You can run the linters with `npm run codequality`.

Unit tests are done with MochaJS. JavaScript files in the component folder ending with `.Spec.js` will be run through Mocha. Run tests by executing `npm run test`.

### Building and uploading

Running `npm run dist` will compile and build in your `src` folder and pipe it to the `dist` folder. This folder can then be uploaded to your sever by running `npm run upload`.

In order to upload, you'll need to add an `.env` file to your project root with your FTP credentials:

```
UPLOAD_HOST=ftp.example.org
UPLOAD_USER=username
UPLOAD_PASSWORD=password
```

### Building as a static website

Running `npm run website` will compile and build in your `src` folder and pipe it to the `dist` folder. This command is a little bit different of `dist`, `website` will get all your templates and move to the root of the `dist` folder, so you can run a server directly in `dist` or upload for a static hosting like `Netlify` or `Amazon S3`. Make sure that you have a `index` file in the root of `templates` folder.

## 🕹 Extending the boilerplate

### How to: Configure bundles

By default, the boilerplate uses Browserify to bundle all direct childs of the `/src/static/js` in their own bundle. To import a whole directory into your bundle, make it importable via an index.js file:

```
export default require('./**/!(*.Spec).js', { mode: 'hash', resolve: ['reduce', 'strip-ext'] });
```

### How to: Including external dependencies

To include external dependencies in your procect, you can either install them as runtime dependency using `npm i --save` or import them directly from a vendor folder.

### How to: Run ConditionerJS💆‍♀️ instead of Vanilla

if you want to run [ConditionerJS](https://github.com/rikschennink/conditioner):

1. Run `npm i conditioner-js --save`
2. Remove the manual init code block in main.js
3. Uncomment the conditioner init code block in main.js
4. Enjoy

## 📚 Using the component library

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

## 🏷 Using the custom Nunjucks component tag

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

You can also provide both a data path and inline data:

```
{% component 'component-name', 'component-name-variation.json', { override: 'something' } %}
```

If the component resides in a nested folder, simply write out the path to it. For example:

```
{% component 'my-sub-folder/component-name' %}
```

### Templates

Like components, templates can be nested inside of sub-folders to any depth. Also like components, templates that have an accompanying JSON file will have it automatically loaded and provided as template data.

### includeData plugin

In case the above isn't enough at some point, the [includeData plugin](https://github.com/VincentLeung/nunjucks-includeData) is available for even more freedom in including data from external JSON files. Refer to its documentation for details.
