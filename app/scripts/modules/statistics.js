'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {
        function statistics() {
            // Define attributes.
            this.defaultAttrs({
                select: '#proband-list-statistics > li > a'
            });

            this.prepareStatistics = function(ev, data) {
                Globals.clearProbandList();

                // Set message.
                $('#statisticsAlert').html($.t('statistics.load-proband-information'));

                // Get proband list.
                var probandList = $('#proband-list-statistics');

                // Empty list.
                probandList.html('');

                // Get list of active probands.
                var activeProbandList = Globals.getProbandList();

                // Get current workspace.
                var workspace = Globals.getWorkspace();

                // Get list of probands from workspace.
                var probands = workspace.proband_data;

                var source = $('#statistics-probands-template').html();
                var template = Handlebars.compile(source);
                $('#proband-list-statistics').html(template({
                    probands: probands
                }));
            };

            this.showStatistics = function(ev, data) {
                // Prepare.
                // this.trigger('uiStatisticsPrepare');

                // Get statistics container.
                var statisticsContainer = $('.statistics-container');

                // Remove old content, if any.
                statisticsContainer.html('');

                // Clear statistics alert.
                $('#statisticsAlert').hide();

                // Get proband list.
                var probandList = Globals.getProbandList();

                // If proband list is empty...
                if (probandList.length === 0) {
                    // Show message.
                    $('#statisticsAlert').show();

                    // And...
                    return;
                }

                // Load proband data of probands.
                var probandData = {};
                for (var i in probandList) {
                    probandData[probandList[i]] = Storage.loadProbandData(Globals.getWorkspace(), probandList[i]);
                }

                /*
                 * Frequency of Interactions.
                 */
                statisticsContainer.append('<h3 data-i18n="statistics.label-frequency-of-interactions"></h3>').i18n();

                for (var proband in probandData) {
                    statisticsContainer.append('<p>' + proband + '</p>');
                    statisticsContainer.append('<div id="foi-' + proband + '"></div>');
                    var frequency = Calculations.getInteractionTypeFrequencyArray(probandData[proband].interactions);
                    var plotFrequency = $.jqplot(
                        'foi-' + proband, [frequency], {
                            seriesDefaults: {
                                renderer: $.jqplot.PieRenderer,
                                rendererOptions: {
                                    showDataLabels: true
                                }
                            },
                            legend: {
                                show: true,
                                location: 'e'
                            }
                        });
                }

                /*
                 * Privacy settings.
                 */
                var privacyContainer = $('<div></div>');

                statisticsContainer.append('<h3 data-i18n="statistics.label-privacy"></h3>').i18n();

                for (proband in probandData) {
                    // Get privacy data.
                    var privacy = probandData[proband].privacy;

                    // Create table.
                    var privacyTable = $('<table class="table"></table>');

                    // Append.
                    privacyContainer.append('<p>' + proband + '</p>');
                    privacyContainer.append(privacyTable);
                }

                statisticsContainer.append(privacyContainer);
            };

            this.onProbandSelect = function(evt) {
                // Get node.
                var node = $(evt.target);

                // Toggle class.
                node.closest('li').toggleClass('active');

                // Get proband.
                var proband = node.data('proband');

                // Add or remove from proband list.
                if (node.closest('li').hasClass('active')) {
                    Globals.addToProbandList(proband);
                } else {
                    Globals.removeFromProbandList(proband);
                }

                // Trigger statistics event.
                this.trigger('uiShowStatistics');
            };

            this.after('initialize', function() {
                this.on('uiStatisticsPrepare', this.prepareStatistics);
                this.on('uiShowStatistics', this.showStatistics);
                this.on('click', {
                    select: this.onProbandSelect
                });
            });
        }

        return defineComponent(statistics);
    }
);
