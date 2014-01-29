'use strict';

define(
    [
        '../locales/language',
        'navigation',
        'pageloader',
        'workspace',
        'statistics',
        'setup',
        'configuration',
        'animation',
        'probands',
        'dragdrop',
        'export',
        'timeline',
        'interactions',
        'activities',
        'eventifier'
    ], function(Language, Navigation, PageLoader, Workspace, Statistics, Setup, Configuration, Animation, Probands, DragDrop, Export, Timeline, Interactions, Activities, Eventifier) {
        function initialize() {
            // Attach components.
            Navigation.attachTo(document);
            PageLoader.attachTo(document);
            Workspace.attachTo(document);
            Statistics.attachTo(document);
            Setup.attachTo(document);
            Configuration.attachTo(document);
            Animation.attachTo(document);
            Probands.attachTo(document);
            DragDrop.attachTo(document);
            Export.attachTo(document);
            Timeline.attachTo(document);
            Interactions.attachTo(document);
            Activities.attachTo(document);
            Eventifier.attachTo(document);

            // Initialize i18next.
            $.i18n.init({
                // Set language for testing purposes.
                lng: 'en',
                // Define namespaces.
                ns: {
                    namespaces: ['common'],
                    defaultNs: 'common'
                },
                // Load resource map from mixin.
                resStore: Language.getLanguageMap()
            });

            // Translate.
            $("#landing-page").i18n();
            $("#ivy-page").i18n();
        }

        return initialize;
    }
);
