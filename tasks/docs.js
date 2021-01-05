import config from '../config'
import { src, dest, series, watch } from 'gulp'
import render from 'gulp-nunjucks-render'
import transform from 'gulp-transform'
import ext from 'gulp-ext-replace'
import gulpif from 'gulp-if'
import helpers from './util/docHelpers'
import envManager from './util/envManager'

/**
 * Sub-task: Docs copy statics
 * @returns {NodeJS.WritableStream}
 */
function docsCopyStatics() {
  return src(config.docs.src.statics).pipe(dest(config.docs.dist.static))
}

/**
 * Sub-task: Docs render index
 * @returns {NodeJS.WritableStream}
 */
function docsRenderIndex() {
  // Grab list of templates
  const templates = helpers.getTemplateTree(config.docs.src.templates)
  const components = helpers.getComponentTree(config.docs.src.components)
  const lastUpdated = new Date()

  // Data
  const data = {
    templates,
    components,
    lastUpdated: lastUpdated.toISOString(),
    lastUpdatedText: new Intl.DateTimeFormat(
      config.docs.date.locale,
      config.docs.date.options
    ).format(lastUpdated)
  }

  const paths = [
    config.docs.src.indexDir,
    config.docs.src.layoutDir,
    config.html.src.layoutDir,
    config.html.src.componentsDir
  ]

  // Render index template
  return src(config.docs.src.index)
    .pipe(render({ path: paths, data, manageEnv: envManager }))
    .pipe(dest(config.docs.dist.base))
}

/**
 * Render Docs components
 * @returns {NodeJS.WritableStream}
 */
function docsRenderComponents() {
  return src([config.docs.src.componentsAll])
    .pipe(
      gulpif(
        helpers.hasContent,
        transform('utf8', (content, file) =>
          helpers.renderComponent(content, file)
        )
      )
    )
    .pipe(ext('.html'))
    .pipe(dest(config.docs.dist.components))
}

/**
 * Render Docs component demos
 * @returns {NodeJS.WritableStream}
 */
function docsRenderComponentDemos() {
  return src([config.docs.src.componentsAll])
    .pipe(
      gulpif(
        helpers.hasContent,
        transform('utf8', (content, file) =>
          helpers.renderComponentDemo(content, file)
        )
      )
    )
    .pipe(ext('.demo.html'))
    .pipe(dest(config.docs.dist.components))
}

/**
 * Task: Docs Compile
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export function docs(cb) {
  return series(
    docsCopyStatics,
    docsRenderIndex,
    docsRenderComponents,
    docsRenderComponentDemos
  )(cb)
}

/**
 * Task: Docs Watch
 */
export function docsWatch() {
  const paths = [
    config.docs.src.index,
    config.docs.src.componentsAll,
    config.docs.src.componentsData,
    config.html.src.templates,
    config.html.src.layout,
    config.html.src.components
  ]

  watch(paths, series(docs))
}
