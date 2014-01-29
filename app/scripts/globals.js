var Globals = function() {
    // Workspace.
    this.workspace = null;

    // Drop store.
    this.drop = null;

    // Timeline object.
    this.timeline = null;

    // Proband list for statistics.
    this.probandList = [];

    this.setWorkspace = function(workspace) {
        this.workspace = workspace;
    };

    this.getWorkspace = function() {
        return this.workspace;
    };

    this.isWorkspaceLoaded = function() {
        return this.workspace != null;
    };

    this.setDropData = function(dropData) {
        this.drop = dropData;
    };

    this.getDropData = function() {
        return this.drop;
    };

    this.setTimeline = function(timeline) {
        this.timeline = timeline;
    };

    this.getTimeline = function() {
        return this.timeline;
    };

    this.addToProbandList = function(proband) {
        if (this.probandList.indexOf(proband) > -1)
            return;

        this.probandList.push(proband);
    };

    this.removeFromProbandList = function(proband) {
        for (var i in this.probandList) {
            if (this.probandList[i] === proband)
                this.probandList.splice(i, 1);
        }
    };

    this.clearProbandList = function() {
        this.probandList = [];
    };

    this.getProbandList = function() {
        return this.probandList;
    };
};

window.Globals = new Globals();
