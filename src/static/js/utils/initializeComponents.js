// Reference our components so they get included
import components from '../../../components';

// All other imports
// import Example from 'ui/Example';


// Attach components to elements
export const initializeComponents = context => {

    const elements = Array.from(context.querySelectorAll('[data-module]:not([data-initialized])'));

    elements.forEach(element => {

        // Convert dataset to object in a crossbrowser fashion
        const options = Object.keys(element.dataset)
            .reduce((obj, key) => ({ [key]: element.dataset[key] }), {});

        // Using the dataset as option means you pass your options as data-setting="value" instead of
        // data-options='{"setting":"value"}'

        element.dataset.module
            .split(',')
            .forEach(path => {
                const module = path in components ? components[path] : require(path);
                const Component = module.default ? module.default : module;
                new Component(element, options); /* eslint no-new: 0 */
            });

        element.setAttribute('data-initialized', 'true');
    });
};
