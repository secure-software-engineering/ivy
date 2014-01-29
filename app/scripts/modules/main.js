require.config({
    paths: {
        'Handlebars': '../../bower_components/handlebars/handlebars',
        'moment': '../../bower_components/moment/moment',
        'chaps-links-timeline': '../../bower_components/chap-links-timeline/timeline',
        'components': '../../bower_components',
        'd3': '../../bower_components/d3/d3',
    }
});

require(
    [
        'components/flight/lib/compose',
        'components/flight/lib/registry',
        'components/flight/lib/advice',
        'components/flight/lib/logger',
        'components/flight/lib/debug',
        'ivy'
    ],
    function(compose, registry, advice, withLogging, debug, ivy) {
        debug.enable(true);
        debug.events.logAll(); //log everything
        compose.mixin(registry, [advice.withAdvice, withLogging]);
        ivy();
    }
);
