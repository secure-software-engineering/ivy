var Storage = function() {
    this.consistencyWorkspace = function() {
        // Get workspaces from local storage.
        var workspaces = $.jStorage.get('workspaces');

        // Check if null.
        if (workspaces == null) {
            // Create workspaces array.
            $.jStorage.set('workspaces', []);
        }
    };

    this.getWorkspaces = function() {
        Storage.consistencyWorkspace();

        // Return workspaces.
        return $.jStorage.get('workspaces');
    };

    this.getListOfWorkspaces = function() {
        Storage.consistencyWorkspace();

        // Get workspaces from local storage.
        var workspaces = $.jStorage.get('workspaces');

        // Check if result is invalid.
        if (!workspaces) {
            // If so, return null.
            return null;
        }

        // Return value, list of workspace names.
        var names = [];

        // Generate list of workspace names.
        for (var i in workspaces) {
            // Get current workspace.
            var workspace = workspaces[i];

            // Add name of current workspace to list of workspace names.
            names.push(workspace.name);
        }

        // Return found workspaces.
        return names;
    };

    this.hasWorkspace = function(workspaceName) {
        Storage.consistencyWorkspace();

        // Get workspaces from local storage.
        var workspaces = $.jStorage.get('workspaces');

        // Try to find workspace with given name.
        for (var i in workspaces) {
            // Get current workspace.
            var workspace = workspaces[i];

            // Check if workspace matches given name.
            if (workspace.name === workspaceName) return true;
        }

        // Nothing found? Return false.
        return false;
    };

    this.loadWorkspace = function(workspaceName) {
        Storage.consistencyWorkspace();

        // Get workspaces from local storage.
        var workspaces = $.jStorage.get('workspaces');

        // Find requested workspace.
        for (var i in workspaces) {
            // Get current workspace.
            var workspace = workspaces[i];

            // Check if workspace should be returned
            if (workspace.name === workspaceName) {
                return workspace;
            }
        }

        // Nothing found? Return null.
        return null;
    };

    this.saveWorkspace = function(updatedWorkspace) {
        Storage.consistencyWorkspace();

        // Get workspaces from local storage.
        var workspaces = $.jStorage.get('workspaces');

        // Find and replace workspace.
        for (var i in workspaces) {
            // Get current workspace.
            var workspace = workspaces[i];

            // Check if workspace should be replaced.
            if (workspace.name === updatedWorkspace.name) {
                workspaces[i] = updatedWorkspace;
            }
        }

        // Save workspaces to local storage.
        $.jStorage.set('workspaces', workspaces);
    };

    this.createWorkspace = function(newWorkspace) {
        Storage.consistencyWorkspace();

        // Return with error, if there's a workspace with the same name.
        if (Storage.hasWorkspace(newWorkspace.name)) throw 'name_conflict';

        // Get workspaces from local storage.
        var workspaces = $.jStorage.get('workspaces');

        // Add new workspace.
        workspaces.push(newWorkspace);

        // Save back to local storage.
        $.jStorage.set('workspaces', workspaces);
    };

    this.deleteWorkspace = function(workspaceName) {
        Storage.consistencyWorkspace();

        // Get workspaces from local storage.
        var workspaces = $.jStorage.get('workspaces');

        // Find workspace.
        for (var i in workspaces) {
            // Get current workspace.
            var workspace = workspaces[i];

            // Check if workspace should be deleted.
            if (workspace.name === workspaceName) {
                // Delete workspace.
                workspaces.splice($.inArray(workspace, workspaces), 1);
            }
        }

        // Save back to local storage.
        $.jStorage.set('workspaces', workspaces);
    };

    this.loadProbandData = function(workspace, probandID) {
        // Return interaction data for proband, if any.
        return workspace.proband_data[probandID];
    };

    this.getProbands = function(workspace) {
        return workspace.proband_data;
    };

    this.saveProbandData = function(workspace, probandID, probandData) {
        Storage.consistencyWorkspace();

        // Save interaction data to workspace.
        workspace.proband_data[probandID] = probandData;

        // Save workspace to storage.
        Storage.saveWorkspace(workspace);
    };

    this.deleteProbandData = function(workspace, probandID) {
        Storage.consistencyWorkspace();

        // Get proband data area.
        var probandDataArea = workspace.proband_data;

        // Remove proband by proband ID.
        delete probandDataArea[probandID];

        // Save workspace.
        Storage.saveWorkspace(workspace);
    };

    this.importWorkspaces = function(workspaces) {
        Storage.consistencyWorkspace();

        if (Array.isArray(workspaces)) {
            for (var i = 0; i < workspaces.length; i++) {
                Storage.createWorkspace(workspaces[i]);
            }
        } else {
            Storage.createWorkspace(workspaces);
        }
    };
};

// Register storage.
window.Storage = new Storage();
