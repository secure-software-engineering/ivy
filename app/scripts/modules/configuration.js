'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {
        function configuration() {
            this.after('initialize', function() {
            });
        }

        return defineComponent(configuration);
    }
);
