import includeData from 'nunjucks-includeData'

module.exports = env => {
    env.addFilter('isNumber', input => typeof input === 'number');
    includeData.install(env);
};
