'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {
        function Export() {
            this.importRequested = function(e) {
                // Get workspaces data.
                var importWorkspaceData = Globals.getDropData();

                try {
                    // Parse from text to object.
                    importWorkspaceData = $.parseJSON(importWorkspaceData);
                } catch (e) {
                    alert($.t('messages.corrupt-workspaces-data'));

                    // Stop.
                    return;
                }

                // Write workspaces to storage.
                Storage.importWorkspaces(importWorkspaceData);

                // List workspaces.
                this.trigger('dataListWorkspaces');
            };

            this.exportRequested = function(e) {
                // Get workspaces.
                var workspaces = Storage.getWorkspaces();

                // Generate JSON serialization.
                var json = JSON.stringify(workspaces);

                // Use HTML5 FileAPI.
                saveAs(
                    new Blob([json], {
                        type: 'text/plain;charset=' + document.characterSet
                    }),
                    'workspaceExport.json'
                );
            };

            this.singleExportRequested = function(ev, data) {
                // Get workspace name.
                var workspaceName = data.workspace;

                // Get workspaces.
                var workspaces = Storage.getWorkspaces();

                // Get single workspace.
                var workspace = null;
                for (var i in workspaces) {
                    if (workspaces[i].name === workspaceName)
                        workspace = workspaces[i];
                }

                // Check if null.
                if (workspace == null) {
                    alert($.t('messages.export-single-failed'));
                    return;
                }

                // Generate JSON serialization.
                var json = JSON.stringify(workspace);

                // Use HTML5 FileAPI.
                saveAs(
                    new Blob([json], {
                        type: 'text/plain;charset=' + document.characterSet
                    }),
                    'workspace.json'
                );
            };

            this.after('initialize', function() {
                this.on('dataImportRequested', this.importRequested);
                this.on('dataExportRequested', this.exportRequested);
                this.on('dataSingleExportRequested', this.singleExportRequested);
            });
        }

        return defineComponent(Export);
    }
);
