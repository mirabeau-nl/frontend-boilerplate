import includeData from 'nunjucks-includeData'
import { ComponentTag } from './nunjucks-extensions'

module.exports = env => {
    // IncludeData plugin
    includeData.install(env);

    // Extensions
    env.addExtension('component', new ComponentTag(env));

    // Filters
    env.addFilter('isNumber', input => typeof input === 'number');
};
