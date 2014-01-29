'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {


        function pageLoader() {
            this.changePageTo = function(ev, data) {
                // Generate path from identifier.
                var path = 'templates/' + data.identifier + '.html';

                // Get stage.
                var stage = '.' + data.stage;

                // Get event.
                var eventAfterLoad = data.eventAfterLoad;

                // Get possible parameters.
                var eventAfterLoadParameters = data.eventAfterLoadParameters;

                // If string, try to split by comma.
                if (eventAfterLoad && eventAfterLoad.substring)
                    eventAfterLoad = eventAfterLoad.split(',');

                // Set context for event triggering.
                var context = this;

                // Send request.
                $.ajax({
                    url: path,
                    dataType: 'html',
                    success: function(message) {
                        // Set stage.
                        $(stage).html(message);

                        // Translate.
                        $(stage).i18n();

                        // Trigger event, if any.
                        if (eventAfterLoad != null) {
                            // Array hack.
                            eventAfterLoad = [].concat(eventAfterLoad);

                            // Trigger events.
                            for (var i in eventAfterLoad) {
                                context.trigger(eventAfterLoad[i], eventAfterLoadParameters);
                            }
                        }
                    }
                });
            };

            this.after('initialize', function() {
                this.on('uiPageLoadRequested', this.changePageTo);
            });
        }

        return defineComponent(pageLoader);
    }
);
