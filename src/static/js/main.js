require.config({
    map: {
        "*": {
            conditioner: 'vendor/conditionerjs/conditioner'
        }
    }
});

require(['conditioner'], function(conditioner) {
    conditioner.init();
});
