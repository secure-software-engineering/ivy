/*global define, $, Globals, Storage*/
'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(probands);

        function probands() {
            this.showProbands = function(ev, data) {
                // Delete previous shown probands from list.
                $("#probands-table").find("tbody").find("tr").remove();

                // Get global workspace.
                var workspace = Globals.getWorkspace();

                // Get proband data.
                var probandData = workspace['proband_data'];

                // If probands list is empty, set information to table.
                if ($.isEmptyObject(probandData)) {
                    var emptyInformation = '<tr><td colspan="3"><center><h3 data-i18n="messages.no-entries-probands"></h3></center></td></tr>';
                    $("#probands-table").find("tbody").append(emptyInformation).i18n();
                }

                // Iterate through probands.
                for (var proband in probandData) {
                    // Generate row.
                    var row = $("<tr></tr>");

                    // Create entries.
                    var probandNameEntry = $("<td></td>").html(proband);
                    var additionalInformationEntry = $("<td></td>");
                    var buttonEntry = $("<td></td>");
                    var buttonGroup = $("<div class='btn-group'></div>");

                    // Create buttons.
                    var deleteButton = $("<button class='delete-proband-button btn btn-mini btn-danger' data-i18n='proband.button-delete'></button>")
                        .attr('workspace', workspace)
                        .attr('proband', proband)
                        .i18n();

                    // Append buttons.
                    // buttonGroup.append(showStatisticsButton);
                    buttonGroup.append(deleteButton);
                    buttonEntry.append(buttonGroup);

                    // Append.
                    row.append(probandNameEntry);
                    row.append(additionalInformationEntry);
                    row.append(buttonEntry);

                    // Insert.
                    $("#probands-table").find("tbody").append(row);
                }
            };

            this.addProband = function(ev, data) {
                // Get current workspace.
                var workspace = Globals.getWorkspace();

                // Get proband name.
                var probandName = data.probandName;

                // Get interactions.
                var probandData = data.probandData;

                // Save proband data.
                Storage.saveProbandData(workspace, probandName, probandData);

                // Delete global drop data.
                Globals.setDropData(null);

                // Show modal.
                this.trigger('uiAnimateShowModal', {
                    header: 'modal.add-proband-success-header',
                    text: 'modal.add-proband-success-text'
                });
            };

            this.deleteProband = function(ev, data) {
                // Get current workspace.
                var workspace = Globals.getWorkspace();

                // Get proband ID.
                var probandID = data.probandID;

                // Delete proband.
                Storage.deleteProbandData(workspace, probandID);
            };

            this.sanitizeProbandModals = function(ev, data) {
                $("#add-proband-name").val("");
            };

            this.updateFileName = function(evt, data) {
                $('#inputSelectedFileName').val(data.fileName);
            };

            this.uploadProbandFile = function(evt, data) {
                var file = data.file;
                if (file) {
                    var reader = new FileReader();

                    reader.onload = function(evt) {
                        Globals.setDropData(evt.target.result);
                    };

                    reader.readAsText(file);

                    this.trigger('updateFilename', {
                        fileName: file.name
                    });
                    // Show animation.
                    this.trigger('uiAnimateAcceptDrop');
                }
            };

            this.after('initialize', function() {
                this.on('uiShowProbands', this.showProbands);
                this.on('dataAddProband', this.addProband);
                this.on('dataDeleteProband', this.deleteProband);
                this.on('uiSanitizeProbandModals', this.sanitizeProbandModals);
                this.on('updateFilename', this.updateFileName);
                this.on('uploadProbandFile', this.uploadProbandFile);
            });
        }
    }
);