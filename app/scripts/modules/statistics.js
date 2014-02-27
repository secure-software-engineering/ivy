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

                var translationTable = {
                    'Wer kann deine zukünftigen Beiträge sehen?': 'Who can see your future posts?',
                    'Überprüfe alle deine Beiträge und Inhalte, in denen du markiert bist': 'Review all your posts and things you\'re tagged in',
                    'Möchtest du das Publikum für Beiträge einschränken, die du mit Freunden von Freunden oder öffentlich geteilt hast?': 'Limit the audience for posts you\'ve shared with friends of friends or Public?',
                    'Wer kann dir Freundschaftsanfragen senden?': 'Who can send you friend requests?',
                    'Wessen Nachrichten sollen in meinem Postfach gefiltert werden?': 'Whose messages do I want filtered into my Inbox?',
                    'Wer kann mithilfe der von dir zur Verfügung gestellten E-Mail-Adresse nach dir suchen?': 'Who can look you up using the email address you provided?',
                    'Wer kann mithilfe der von dir zur Verfügung gestellten Telefonnummer nach dir suchen?': 'Who can look you up using the phone number you provided?',
                    'Möchtest du, dass andere Suchmaschinen einen Link zu deiner Chronik enthalten?': 'Do you want other search engines to link to your timeline?',
                    'Wer kann in deiner Chronik posten?': 'Who can post on your timeline?',
                    'Möchtest du Beiträge, in denen dich deine Freunde markieren, prüfen, bevor sie in deiner Chronik erscheinen?': 'Review posts friends tag you in before they appear on your timeline?',
                    'Überprüfe, was andere Personen in deiner Chronik sehen': 'Review what other people see on your timeline',
                    'Wer kann Beiträge, in denen du markiert wurdest, in deiner Chronik sehen?': 'Who can see posts you\'ve been tagged in on your timeline?',
                    'Wer kann sehen, was andere in deiner Chronik posten?': 'Who can see what others post on your timeline?',
                    'Möchtest du die Markierungen überprüfen, die Nutzer zu deinen eigenen Beiträgen hinzufügen, bevor sie auf Facebook erscheinen?': 'Review tags people add to your own posts before the tags appear on Facebook?',
                    'Wen möchtest du zu dem Publikum hinzufügen, der noch nicht Teil davon ist, wenn du in einem Beitrag markiert wirst?': 'When you’re tagged in a post, who do you want to add to the audience if they aren’t already in it?',
                    'Wer kann Markierungsvorschläge sehen, wenn Fotos hochgeladen werden, die dir ähneln? (noch nicht verfügbar für dich)': 'Who sees tag suggestions when photos that look like you are uploaded? (this is not yet available to you)'
                };

                function extractPrivacySettings(obj) {
                    var item, key, settings, tmp, value, _i, _len;
                    settings = [];
                    for (key in obj) {
                        value = obj[key];
                        if (typeof value === 'object') {
                            tmp = extractPrivacySettings(value);
                            for (_i = 0, _len = tmp.length; _i < _len; _i++) {
                                item = tmp[_i];
                                settings.push(item);
                            }
                        } else {
                            item = {};
                            item.name = translationTable[key] || key;
                            item.value = value;
                            settings.push(item);
                        }
                    }
                    return settings;
                }

                var privacyContainer = $('<div></div>');

                statisticsContainer.append('<h3 data-i18n="statistics.label-privacy"></h3>').i18n();

                var probandsNameList = [];
                var privacySettingsList = [];

                for (proband in probandData) {
                    probandsNameList.push(proband);

                    var standardSettings = extractPrivacySettings(probandData[proband].privacy.standard.record);
                    var timelineSettings = extractPrivacySettings(probandData[proband].privacy.timeline.record);
                    var privacySettings = standardSettings.concat(timelineSettings);

                    for (i = 0; i < privacySettings.length; i++) {
                        var tmp = privacySettingsList.filter(function(element) {
                            return element.name === privacySettings[i].name;
                        });

                        if (tmp.length === 0) {
                            privacySettingsList.push({
                                name: privacySettings[i].name,
                                values: [privacySettings[i].value]
                            });
                        } else {
                            tmp[0].values.push(privacySettings[i].value);
                        }
                    }
                }

                var source = $('#security-settings-table').html();
                var template = Handlebars.compile(source);
                var html = template({
                    names: probandsNameList,
                    settings: privacySettingsList
                });
                $('#sec-table').html(html);

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
