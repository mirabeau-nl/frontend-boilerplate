module.exports = env => {
    env.addFilter('isNumber', input => typeof input === 'number');
};
