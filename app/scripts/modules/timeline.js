/*global define, Storage, Globals, links, $, moment*/

'use strict';

define([
        'components/flight/lib/component',
        'moment',
        'chaps-links-timeline'
    ],

    function(defineComponent, moment) {
        function timeline() {
            this.prepareData = function(data) {
                var action, cleanDateTime, item, openCloseItem, timelineData, timelinePeriods, typeIcons, _i, _len, _ref, _ref1;

                timelineData = [];
                timelinePeriods = [];
                typeIcons = {
                    like: 'thumbs-up',
                    unlike: 'thumbs-down',
                    commentstatus: 'comment',
                    friendaccepted: 'user',
                    friendignored: 'ban-circle',
                    chat: 'envelope',
                    chatactivated: 'play',
                    chatdeactivated: 'off',
                    updatestatus: 'share',
                    deletestatus: 'edit'
                };
                cleanDateTime = function(date) {
                    var dp, tempDate;

                    if (date.match(/\w+,\s\d{1,2}\.\s\w+\s\d{1,4}\s\d{1,2}\:\d{1,2}\:\d{1,2}/)) {
                        return moment(date, 'dd, DD. MMMM YYYY HH:mm:ss').toDate();
                    } else if (date.match(/\w+\s\w+\s+\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}\s\d{1,4}/)) {
                        return moment(date, 'dd MMM DD HH:mm:ss YYYY').toDate();
                    } else if (date.match(/\d{1,2}\.\d{1,2}\.\d{1,4}\s\d{1,2}\:\d{1,2}\:\d{1,2}/)) {
                        return moment(date, 'DD.MM.YYYY HH:mm:ss').toDate();
                    } else {
                        return moment(date).toDate();
                    }
                };
                _ref = data.interactions;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    action = _ref[_i];
                    if (action.interaction_type === 'chat') {
                        continue;
                    }
                    if (action.interaction_type === 'openFacebook' || action.interaction_type === 'closeFacebook') {
                        openCloseItem = (_ref1 = timelinePeriods.pop()) != null ? _ref1 : {};
                        if ('end' in openCloseItem) {
                            timelinePeriods.push(openCloseItem);
                            openCloseItem = {};
                        }
                        if (action.interaction_type === 'openFacebook' && !('start' in openCloseItem)) {
                            openCloseItem.start = cleanDateTime(action.time);
                            openCloseItem.content = 'onfacebook';
                        } else if (action.interaction_type === 'closeFacebook' && 'start' in openCloseItem) {
                            openCloseItem.end = cleanDateTime(action.time);
                        }
                        timelinePeriods.push(openCloseItem);
                    } else {
                        item = {
                            start: cleanDateTime(action.time),
                            content: '<i class="icon-' + typeIcons[action.interaction_type] + '"></i> ' + action.interaction_type
                        };
                        timelineData.push(item);
                    }
                }
                return timelineData.concat(timelinePeriods);
            };

            this.createTimeline = function(ev, data) {
                var proband = Storage.loadProbandData(Globals.getWorkspace(), data.proband);
                var timeline = new links.Timeline(document.getElementById('timeline'));

                var probdata = this.prepareData(proband);
                var options = {
                    style: 'dot',
                    // cluster: true,
                    // axisOnTop: true,
                    // end: new Date()
                    // showNavigation: true,
                    // height: "300px"
                };

                timeline.draw(probdata, options);
            };

            this.loadTimeline = function(ev, data) {
                var timeline = new links.Timeline(document.getElementById('timeline'));

                // get map of probands
                var probands = Storage.getProbands(Globals.getWorkspace());
                for (var ref in probands) {
                    var da = probands[ref];
                    var menuListItem = $(document.createElement('li'))
                        .addClass('select-proband-button')
                        .attr('proband', ref)
                        .append('<a href="#">' + ref + '</a>');
                    $('#probands-list').append(menuListItem);
                }
            };

            this.after('initialize', function() {
                this.on('uiLoadTimeline', this.loadTimeline);
                this.on('createTimeline', this.createTimeline);
            });
        }

        return defineComponent(timeline);
    }
);
