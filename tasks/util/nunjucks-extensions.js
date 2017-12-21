import config from '../../config'
import { nunjucks } from 'gulp-nunjucks-render'
import fs from 'fs'

/**
 * Split the passed-in component identifier into its full path, base, and name
 * Simple case: 'my-component' ⇒ 'my-component/my-component.{njk,json,yml}'
 * Complex case: 'one/two/my-component' ⇒ 'one/two/my-component/my-component.{njk,json,yml}'
 * @param {String} componentIdentifier - the requested component
 * @returns {Object} - signature: { base: full path to component dir, base: requested path minus component name itself, name: component name }
 */
const getComponentParts = componentIdentifier => {
  const parts = componentIdentifier.split('/')
  const name = parts.pop()
  const base = parts.join('/')
  const path = `${config.html.src.componentsDir}${
    base ? `/${base}` : ''
  }/${name}`

  return { path, base, name }
}

/**
 * Get the component's local data path
 * @param {Object} component - component info object from `getComponentParts`
 * @returns {String|undefined} - path to data file, or undefined if none found
 */

// [!] Description doesn't match what the function does. Should it return path in either case, or return undefined in none found?
const getLocalDataPath = component => {
  // Try to find data file in component's directory with same name
  const path = `${component.path}/${component.name}.json`
  if (fs.existsSync(path)) {
    return path
  }

  return null
}

/**
 * Get specific data path
 * @param {String|Object} dataPathOrData - a path to a JSON file, or a POJO
 * @param {Object} component - component info object from `getComponentParts`
 * @returns {String|null} - path to data file, or undefined if none found
 */
const getRequestedDataPath = (dataPathOrData, component) => {
  let path = `${component.path}/${dataPathOrData}`

  // Check if requested path exists in component's directory
  if (fs.existsSync(path)) {
    return path
  }

  // Then, check if requested path exists from the project's base dir (e.g. `/data/foo.json`)
  path = `${config.base.src}/${dataPathOrData}`
  if (fs.existsSync(path)) {
    return path
  }

  return null
}

/**
 * Determine the path to the data file to be loaded, if any
 * @param {String|Object} dataPathOrData - a path to a JSON file, or a POJO
 * @param {Object} component - component info object from `getComponentParts`
 * @returns {String|undefined} - path to data file, or undefined if none found
 */
const getDataPath = (dataPathOrData, component) => {
  return typeof dataPathOrData === 'string'
    ? getRequestedDataPath(dataPathOrData, component)
    : getLocalDataPath(component)
}

/**
 * Custom tag 'component' that attempts to load a component's accompanying JSON data file, if any, and pass the data to the component.
 * Use as `{% component 'foo' %}` instead of `{% include '../components/foo/foo.html' %}`
 * A second, optional argument is supported. If it's a string, it specifies an alternate data source, e.g.:
 * `{% component 'foo', 'data/foo.json' %}`
 * This path will be looked for in the component directory itself first, then it will try to find it from the project base.
 * It can also be an object to augment the data set, e.g.:
 * `{% component 'foo', { color: 'hotpink' } %}`
 * @param {Object} env - The Nunjucks environment object
 */
export const ComponentTag = function(env) {
  this.tags = ['component']

  this.parse = (parser, nodes) => {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    return new nodes.CallExtension(this, 'run', args)
  }

  this.run = (context, componentIdentifier, dataPathOrData) => {
    const component = getComponentParts(componentIdentifier)
    const dataPath = getDataPath(dataPathOrData, component)
    const componentStem = `${component.base ? `${component.base}/` : ''}${
      component.name
    }/${component.name}`
    let json = {}

    if (dataPath) {
      try {
        json = JSON.parse(fs.readFileSync(dataPath))
      } catch (error) {
        global.console.log(error)
      }
    }

    const data =
      typeof dataPathOrData === 'string' ? json : { ...json, ...dataPathOrData }

    return new nunjucks.runtime.SafeString(
      env.render(`${componentStem}.njk`, data)
    )
  }
}
