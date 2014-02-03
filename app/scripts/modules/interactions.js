/*global define, $, Globals, Storage*/
'use strict';

define(
    [
        'components/flight/lib/component',
        'd3'
    ],

    function(defineComponent, d3) {
        function heatmap() {

            this.defaultAttrs({
                select: '#proband-list-heatmap > li > a'
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

                this.trigger('prepareHeatmapData');
            };

            this.prepareHeatmap = function(evt, data) {
                Globals.clearProbandList();

                // Set message.
                $('#statisticsAlert').html($.t('statistics.load-proband-information'));

                // Get proband list.
                var probandList = $('#proband-list-heatmap');

                // Empty list.
                probandList.html('');

                // Get list of active probands.
                var activeProbandList = Globals.getProbandList();

                // Get current workspace.
                var workspace = Globals.getWorkspace();

                // Get list of probands from workspace.
                var probands = workspace.proband_data;

                var source = $('#heatmap-probands-template').html();
                var template = Handlebars.compile(source);
                $('#proband-list-heatmap').html(template({
                    probands: probands
                }));
            };

            this.prepareHeatmapData = function(evt, data) {
                var selectedProbands = Globals.getProbandList();

                // Load proband data of probands.
                var probandData = {};
                for (var i in selectedProbands) {
                    probandData[selectedProbands[i]] = Storage.loadProbandData(Globals.getWorkspace(), selectedProbands[i]);
                }

                var heatmapData, idx, in$, interaction, proband;
                heatmapData = [];
                in$ = function(member, list) {
                    var i, item;
                    for (var i$ = 0, length$ = list.length; i$ < length$; ++i$) {
                        item = list[i$];
                        i = i$;
                        if (item.id === member)
                            return i;
                    }
                    return -1;
                };
                for (proband in probandData) {
                    data = probandData[proband];
                    for (var i$ = 0, length$ = data.interactions.length; i$ < length$; ++i$) {
                        interaction = data.interactions[i$];
                        if ('object_id' in interaction)
                            if ((idx = in$(interaction.object_id, heatmapData)) >= 0) {
                                heatmapData[idx].records.push(interaction);
                            } else {
                                heatmapData.push({
                                    id: interaction.object_id,
                                    records: [interaction]
                                });
                            }
                    }
                }

                var asd = {
                    data: heatmapData
                };

                this.trigger('showHeatmap', asd);
            };

            this.showHeatmap = function(evt, obj) {
                var oid;

                $('#heatmap-chart').html('');
                $('.tooltip').remove();

                var data = obj.data;

                var gridSize = 30;
                var cols = 20;
                var width = cols * gridSize;
                var margin = {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                };

                var colors = [
                    'FFFFCC',
                    'A1DAB4',
                    '41B6C4',
                    '2C7FB8',
                    '253494'
                ];

                var domain = [];

                for (var i$1 = 0, length$1 = data.length; i$1 < length$1; ++i$1) {
                    oid = data[i$1];
                    domain.push(oid.records.length);
                }

                var colorScale = d3.scale.quantize()
                    .domain([Math.log(d3.min(domain)), Math.log(d3.max(domain))])
                    .range(colors);

                var height = Math.ceil((data.length * gridSize) / width) * gridSize + 100;

                var svg = d3.select('#heatmap-chart').append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                var heatMap = svg.selectAll('.interaction')
                    .data(data)
                    .enter().append('rect')
                    .attr('x', function(d, i) {
                        return ((i % Math.floor(width / gridSize)) * gridSize);
                    })
                    .attr('y', function(d, i) {
                        return (Math.floor(i * gridSize / width) * gridSize);
                    })
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .attr('width', gridSize)
                    .attr('height', gridSize)
                    .attr('stroke', 'grey')
                    .style('fill', function(d) {
                        return colorScale(Math.log(d.records.length));
                    })
                    .on('mouseover', function(d, i) {
                        $('.tooltip').addClass('fade in top');
                        div.style('left', ($(this).position().left) + 'px')
                            .style('top', ($(this).position().top) - 38 + 'px');
                        tooltip_inner.html(d.records.length);
                        return;
                    })
                    .on('mouseout', function(d) {
                        $('.tooltip').removeClass('fade in top');
                    })
                    .on('click', function(d) {
                        var source = $('#heatmap-details-template').html();
                        var template = Handlebars.compile(source);
                        $('#heatmap-details').html(template(d));
                    });

                var div = d3.select('body').append('div')
                    .attr('class', 'tooltip');

                div.append('div')
                    .attr('class', 'tooltip-arrow');

                var tooltip_inner = div.append('div')
                    .attr('class', 'tooltip-inner');

                var legend = svg.selectAll('.legend')
                    .data(colors, function(d) {
                        return d;
                    })
                    .enter().append('g')
                    .attr('class', 'legend');

                legend.append('rect')
                    .attr('x', function(d, i) {
                        return width / 2 / colors.length * i;
                    })
                    .attr('y', (height - 50))
                    .attr('width', width / 2 / colors.length)
                    .attr('height', gridSize / 2)
                    .style('fill', function(d, i) {
                        return colors[i];
                    });

                legend.append('text')
                    .attr('class', 'mono')
                    .text(function(d) {
                        return '≥ ' + Math.ceil(Math.exp(colorScale.invertExtent(d)[0]));
                    })
                    .attr('x', function(d, i) {
                        return width / 2 / colors.length * i;
                    })
                    .attr('y', (height - 50) + gridSize);
            };

            this.loadHeatmap = function(evt, data) {
                this.trigger('prepareHeatmap');
            };

            this.after('initialize', function() {
                this.on('uiLoadHeatmap', this.loadHeatmap);
                this.on('prepareHeatmap', this.prepareHeatmap);
                this.on('prepareHeatmapData', this.prepareHeatmapData);
                this.on('showHeatmap', this.showHeatmap);
                this.on('click', {
                    select: this.onProbandSelect
                });
            });
        }

        return defineComponent(heatmap);
    }
);
