/*global $, Storage, define, Globals*/

'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {
        return defineComponent(workspace);

        function workspace() {
            // Workspaces.
            var workspaces = {};

            this.listWorkspaces = function(ev, data) {
                // Delete all previous listed workspace names.
                $("#workspaces-table").find("tbody").find("tr").remove();

                // Get list of workspaces.
                var workspaces = Storage.getListOfWorkspaces();

                // If workspaces list is empty, set information to table.
                if (workspaces.length === 0) {
                    var emptyInformation = '<tr><td colspan="3"><center><h3 data-i18n="messages.no-entries-workspace"></h3></center></td></tr>';
                    $("#workspaces-table").find("tbody").append(emptyInformation).i18n();
                }

                // List workspaces in DOM.
                for (var i in workspaces) {
                    // Current workspace.
                    var workspace = workspaces[i];

                    // Generate row.    
                    var row = $("<tr></tr>");

                    // Create entries.
                    var workspaceNameEntry = $("<td></td>").html(workspace);
                    var additionalInformationEntry = $("<td></td>");
                    var buttonEntry = $("<td></td>");
                    var buttonGroup = $("<div class='btn-group'></div>");

                    // Create buttons.
                    var loadButton = $("<button class='load-workspace-button btn btn-mini' data-i18n='workspaces.load-button'></button>")
                        .attr('workspace', workspace)
                        .i18n();
                    var exportButton = $("<button class='export-single-workspace-button btn btn-mini btn-info' data-i18n='workspaces.single-export-button'></button>")
                        .attr('workspace', workspace)
                        .i18n();
                    var deleteButton = $("<button class='delete-workspace-button btn btn-mini btn-danger' data-i18n='workspaces.delete-button'></button>")
                        .attr('workspace', workspace)
                        .i18n();

                    // Append buttons.
                    buttonGroup.append(loadButton);
                    buttonGroup.append(exportButton);
                    buttonGroup.append(deleteButton);
                    buttonEntry.append(buttonGroup);

                    // Append.
                    row.append(workspaceNameEntry);
                    row.append(additionalInformationEntry);
                    row.append(buttonEntry);

                    // Insert.
                    $("#workspaces-table").find("tbody").append(row);
                }
            };

            this.loadWorkspace = function(ev, data) {
                // Get workspace name.
                var workspaceName = data.workspaceName;

                // Load workspace from storage.
                var workspace = Storage.loadWorkspace(workspaceName);
                Globals.setWorkspace(workspace);

                // Trigger animation show event.
                this.trigger('uiAnimateShowSaveWorkspaceButton');

                // Set information field.
                this.trigger('uiAnimateSetWorkspaceName');

                // Enable top navigation links.
                this.trigger('uiEnableTopNavigationLinks');
            };

            this.saveWorkspace = function(ev, data) {
                // Save global workspace to storage.
                Storage.saveWorkspace(Globals.getWorkspace());

                // Trigger animation event.
                this.trigger('uiAnimateSaveWorkspace');
            };

            this.createWorkspace = function(ev, data) {
                // Create workspace object with given information.
                var workspace = {
                    name: data.workspaceName,
                    author: data.author,
                    proband_data: {},
                    checksum: null
                };

                // Try to create workspace.
                try {
                    Storage.createWorkspace(workspace);
                } catch (e) {
                    // Name conflict found?
                    if (e == "name_conflict") {
                        // Show modal with error.
                        this.trigger('uiAnimateShowModal', {
                            header: 'modal.create-workspace-name-conflict-header',
                            text: 'modal.create-workspace-name-conflict-text'
                        });
                    }

                    // Nothing left to do.
                    return;
                }
            };

            this.deleteWorkspace = function(ev, data) {
                // Get workspace name.
                var workspaceName = data.workspaceName;

                // Delete workspace from storage.
                Storage.deleteWorkspace(workspaceName);
            };

            this.uploadWorkspaceFile = function(evt, data) {
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
                this.on('dataListWorkspaces', this.listWorkspaces);
                this.on('dataLoadWorkspace', this.loadWorkspace);
                this.on('dataSaveWorkspace', this.saveWorkspace);
                this.on('dataCreateWorkspace', this.createWorkspace);
                this.on('dataDeleteWorkspace', this.deleteWorkspace);
                this.on('uploadWorkspaceFile', this.uploadWorkspaceFile);
            });
        }
    });