/*global define, $, Globals, Storage*/
'use strict';

define(
    [
        'components/flight/lib/component',
        'd3',
        'Handlebars'
    ],

    function(defineComponent, d3) {
        function activities() {

            this.defaultAttrs({
                select: '#proband-list-activities > li > a'
            });

            this.onProbandSelect = function(evt, data) {
                var target = $(evt.target);
                var selectedProband = target.data('proband');

                target.closest('li').toggleClass('active');

                if (target.closest('li').hasClass('active')) {
                    Globals.addToProbandList(selectedProband);
                } else {
                    Globals.removeFromProbandList(selectedProband);
                }

                this.trigger('prepareActivitiesData');
            };

            this.prepareActivities = function(evt, data) {
                Globals.clearProbandList();

                // Set message.
                $('#statisticsAlert').html($.t('statistics.load-proband-information'));

                // Get proband list.
                var probandList = $('#proband-list-activities');

                // Empty list.
                probandList.html('');

                // Get list of active probands.
                var activeProbandList = Globals.getProbandList();

                // Get current workspace.
                var workspace = Globals.getWorkspace();

                // Get list of probands from workspace.
                var probands = workspace.proband_data;

                var source = $('#activities-probands-template').html();
                var template = Handlebars.compile(source);
                $('#proband-list-activities').html(template({
                    probands: probands
                }));
            };

            this.prepareActivitiesData = function(evt, data) {
                var selectedProbands = Globals.getProbandList();

                // Load proband data of probands.
                var probands = {};
                for (var i in selectedProbands) {
                    probands[selectedProbands[i]] = Storage.loadProbandData(Globals.getWorkspace(), selectedProbands[i]);
                }

                var action, actions, classes, counters, dataBlob, interaction, pname;
                actions = [
                    'like',
                    'commentstatus',
                    'updatestatus',
                    'share',
                    'chat',
                    'friendaccepted',
                    'openFacebook'
                ];
                classes = [
                    'negligible',
                    'low',
                    'medium',
                    'high'
                ];
                counters = [];
                dataBlob = {};
                for (var i$ = 0, length$ = actions.length; i$ < length$; ++i$) {
                    action = actions[i$];
                    dataBlob[action] = {};
                    dataBlob[action].probandsData = [];
                    dataBlob[action].colorCoding = {
                        negligible: 0,
                        low: 10,
                        medium: 15,
                        high: 20
                    };
                    dataBlob[action].absQuantity = 0;
                }
                for (pname in probands) {
                    data = probands[pname];
                    for (var i$1 = 0, length$1 = actions.length; i$1 < length$1; ++i$1) {
                        action = actions[i$1];
                        counters[action] = 0;
                    }
                    for (var i$2 = 0, length$2 = data.interactions.length; i$2 < length$2; ++i$2) {
                        interaction = data.interactions[i$2];
                        counters[interaction.interaction_type]++;
                    }
                    for (var i$3 = 0, length$3 = actions.length; i$3 < length$3; ++i$3) {
                        action = actions[i$3];
                        dataBlob[action].probandsData.push({
                            name: pname,
                            quantity: counters[action]
                        });
                    }
                }

                var scaleTemp = {};
                for (var i$4 = 0, length$4 = actions.length; i$4 < length$4; ++i$4) {
                    action = actions[i$4];
                    scaleTemp[action] = [];
                    for (var i$5 = 0, length$5 = dataBlob[action].probandsData.length; i$5 < length$5; ++i$5) {
                        scaleTemp[action].push(dataBlob[action].probandsData[i$5].quantity);
                    }
                    var temp = d3.scale.quantize().domain([d3.min(scaleTemp[action]), d3.max(scaleTemp[action])]).range(classes);
                    dataBlob[action].scale = temp;
                    for (var i$6 = 0, length$6 = dataBlob[action].probandsData.length; i$6 < length$6; ++i$6) {
                        dataBlob[action].probandsData[i$6].class = dataBlob[action].scale(dataBlob[action].probandsData[i$6].quantity);
                    }
                    for (var i$7 = 1, length$7 = classes.length; i$7 < length$7; ++i$7) {
                        var cls = classes[i$7];
                        dataBlob[action].colorCoding[cls] = Math.round(dataBlob[action].scale.invertExtent(cls)[0]);
                    }
                    delete dataBlob[action].scale;
                }

                this.trigger('showActivities', dataBlob);
            };

            this.showActivities = function(evt, data) {
                var source = $('#activities-table-template').html();
                var template = Handlebars.compile(source);
                $('#activities-table').html(template(data));
            };

            this.loadActivities = function(evt, data) {
                this.trigger('prepareActivities');
            };

            this.after('initialize', function() {
                this.on('uiLoadActivities', this.loadActivities);
                this.on('prepareActivities', this.prepareActivities);
                this.on('prepareActivitiesData', this.prepareActivitiesData);
                this.on('showActivities', this.showActivities);
                this.on('click', {
                    select: this.onProbandSelect
                });
            });
        }

        return defineComponent(activities);
    }
);
