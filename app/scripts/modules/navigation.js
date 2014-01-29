/*global $, Globals, define, confirm, alert */
'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(navigation);

        function navigation() {
            // Define attributes.
            this.defaultAttrs({
                navref: '.navref',
                loadWorkspaceButton: '.load-workspace-button',
                saveWorkspaceButton: '#save-workspace-button',
                createWorkspaceButton: '#create-workspace-button',
                deleteWorkspaceButton: '.delete-workspace-button',
                selectProbandDataFile: '#buttonSelectProbandFile',
                selectWorkspaceDataFile: '#buttonSelectWorkspaceFile',
                inputProbandData: '#inputProbandFile',
                inputWorkspaceData: '#inputWorkspaceFile',
                addProbandDataButton: '#add-proband-button',
                deleteProbandButton: '.delete-proband-button',
                showProbandStatisticsButton: '.show-statistics-button',
                importWorkspacesButton: '#import-workspaces-button',
                exportWorkspacesButton: '#export-workspaces-button',
                exportSingleWorkspaceButton: '.export-single-workspace-button',
                modalOk: '#modal-ok',
                exit: '.exit',
                selectProbandButton: '.select-proband-button'
            });

            this.navigateToPage = function(e) {
                // If no workspace is loaded, return.
                if (!Globals.isWorkspaceLoaded()) {
                    return;
                }

                this.trigger('dataListWorkspaces', {
                    message: new Date().toLocaleString()
                });
                
                var node = $(e.target);
                this.trigger('uiPageLoadRequested', {
                    identifier: node.attr('identifier'),
                    stage: node.attr('stage'),
                    eventAfterLoad: node.attr('eventAfterLoad')
                });
            };

            this.loadWorkspace = function(e) {
                // Get button.
                var node = $(e.target);

                // Trigger event.
                this.trigger('dataLoadWorkspace', {
                    workspaceName: node.attr('workspace')
                });

                // Switch to proband area.
                this.trigger('uiPageLoadRequested', {
                    identifier: 'ivy.proband',
                    stage: 'state',
                    eventAfterLoad: 'uiShowProbands'
                });

                // Enable top navigation links.
                this.trigger('uiEnableTopNavigationLinks');
            };

            this.saveWorkspace = function(e) {
                // Trigger event.
                this.trigger('dataSaveWorkspace');
            };

            this.createWorkspace = function(e) {
                // Trigger event with information.
                this.trigger('dataCreateWorkspace', {
                    workspaceName: $("#create-workspace-name").val(),
                    author: $("#create-workspace-author").val()
                });

                // Clear fields.
                $("#create-workspace-name").val("");
                $("#create-workspace-author").val("");

                // Trigger reload.
                this.trigger('dataListWorkspaces');
            };

            this.deleteWorkspace = function(e) {
                // Check, if user really wants to delete workspace.
                var check = confirm($.t("dialogs.check-delete-workspace"));

                // If not, return.
                if (!check) return;

                // Get button.
                var node = $(e.target);

                // Trigger event to delete workspace.
                this.trigger('dataDeleteWorkspace', {
                    workspaceName: node.attr('workspace')
                });

                // Trigger reload.
                this.trigger('dataListWorkspaces');
            };

            this.addProbandData = function(e) {
                // Get name of new proband.
                var name = $("#add-proband-name").val();

                // If name is empty, return.
                if (name === "") {
                    alert($.t("messages.empty-proband-name"));

                    // Stop.
                    return;
                }

                // Get proband data.
                var data = Globals.getDropData();

                try {
                    // Parse from text to object.
                    data = $.parseJSON(data);
                } catch (ex) {
                    alert($.t("messages.corrupt-proband-data"));

                    // Stop.
                    return;
                }

                // Trigger event to add proband.
                this.trigger('dataAddProband', {
                    probandName: name,
                    probandData: data
                });

                // List probands.
                this.trigger('uiShowProbands');

                // Sanitize modals.
                this.trigger('uiSanitizeProbandModals');
            };

            this.deleteProband = function(e) {
                // Get button.
                var node = $(e.target);

                // Trigger event to delete proband.
                this.trigger('dataDeleteProband', {
                    probandID: node.attr('proband')
                });

                // Reload area.
                this.trigger('uiShowProbands');
            };

            this.showProbandStatistics = function(e) {
                // Get button.
                var node = $(e.target);

                // Load statistics page.
                this.trigger('uiPageLoadRequested', {
                    identifier: 'ivy.statistics',
                    stage: 'state',
                    eventAfterLoad: 'uiShowStatistics',
                    eventAfterLoadParameters: {
                        proband: node.attr('proband')
                    }
                });
            };

            this.modalOk = function(e) {
                // Hide modal.
                $("#modal-box").hide();
            };

            this.importWorkspaces = function(e) {
                this.trigger('dataImportRequested');
            };

            this.exportWorkspaces = function(e) {
                this.trigger('dataExportRequested');
            };

            this.singleExportWorkspace = function(e) {
                // Get node.
                var node = $(e.target);

                // Get workspace name.
                var workspaceName = node.attr('workspace');

                // Trigger event.
                this.trigger('dataSingleExportRequested', {
                    workspace: workspaceName
                });
            };

            this.exit = function(e) {
                /*
                 * Close operation is not possible inside browser.
                 * Load workspaces, instead.
                 */

                // Set global workspace back to null.
                Globals.setWorkspace(null);

                // Request workspace page.
                this.trigger('uiPageLoadRequested', {
                    identifier: 'ivy.workspaces',
                    stage: 'state',
                    eventAfterLoad: 'dataListWorkspaces'
                });
            };

            this.selectProbandTimeline = function(e) {
                $('.select-proband-button').removeClass('active');
                var menuListItem = $(e.target).closest('li');
                menuListItem.addClass('active');

                var probandName = menuListItem.attr('proband');

                this.trigger('createTimeline', {
                    proband: probandName
                });
            };

            this.selectProbandDataFile = function(evt) {
                $('#inputProbandFile').click();
            };

            this.selectWorkspaceDataFile = function(evt) {
                $('#inputWorkspaceFile').click();
            };

            this.uploadProbandFile = function(evt) {
                var fileList = evt.target.files;
                this.trigger('uploadProbandFile', {
                    file: fileList[0]
                });
            };

            this.uploadWorkspaceFile = function(evt) {
                var fileList = evt.target.files;
                this.trigger('uploadWorkspaceFile', {
                    file: fileList[0]
                });
            };

            // Set events.
            this.after('initialize', function() {
                this.on('click', {
                    navref: this.navigateToPage,
                    loadWorkspaceButton: this.loadWorkspace,
                    saveWorkspaceButton: this.saveWorkspace,
                    createWorkspaceButton: this.createWorkspace,
                    deleteWorkspaceButton: this.deleteWorkspace,
                    addProbandDataButton: this.addProbandData,
                    deleteProbandButton: this.deleteProband,
                    showProbandStatisticsButton: this.showProbandStatistics,
                    importWorkspacesButton: this.importWorkspaces,
                    exportWorkspacesButton: this.exportWorkspaces,
                    exportSingleWorkspaceButton: this.singleExportWorkspace,
                    modalOk: this.modalOk,
                    exit: this.exit,
                    selectProbandButton: this.selectProbandTimeline,
                    selectProbandDataFile: this.selectProbandDataFile,
                    selectWorkspaceDataFile: this.selectWorkspaceDataFile
                });

                this.on('change', {
                    inputProbandData: this.uploadProbandFile,
                    inputWorkspaceData: this.uploadWorkspaceFile
                });
            });
        }
    });