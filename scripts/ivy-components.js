var Globals=new function(){this.workspace=null,this.drop=null,this.timeline=null,this.probandList=[],this.setWorkspace=function(a){this.workspace=a},this.getWorkspace=function(){return this.workspace},this.isWorkspaceLoaded=function(){return null!=this.workspace},this.setDropData=function(a){this.drop=a},this.getDropData=function(){return this.drop},this.setTimeline=function(a){this.timeline=a},this.getTimeline=function(){return this.timeline},this.addToProbandList=function(a){this.probandList.indexOf(a)>-1||this.probandList.push(a)},this.removeFromProbandList=function(a){for(var b in this.probandList)this.probandList[b]==a&&this.probandList.splice(b,1)},this.clearProbandList=function(){this.probandList=[]},this.getProbandList=function(){return this.probandList}},Storage=new function(){this.consistencyWorkspace=function(){var a=$.jStorage.get("workspaces");null==a&&$.jStorage.set("workspaces",new Array)},this.getWorkspaces=function(){return Storage.consistencyWorkspace(),$.jStorage.get("workspaces")},this.getListOfWorkspaces=function(){Storage.consistencyWorkspace();var a=$.jStorage.get("workspaces");if(!a)return null;var b=[];for(var c in a){var d=a[c];b.push(d.name)}return b},this.hasWorkspace=function(a){Storage.consistencyWorkspace();var b=$.jStorage.get("workspaces");for(var c in b){var d=b[c];if(d.name==a)return!0}return!1},this.loadWorkspace=function(a){Storage.consistencyWorkspace();var b=$.jStorage.get("workspaces");for(var c in b){var d=b[c];if(d.name==a)return d}return null},this.saveWorkspace=function(a){Storage.consistencyWorkspace();var b=$.jStorage.get("workspaces");for(var c in b){var d=b[c];d.name==a.name&&(b[c]=a)}$.jStorage.set("workspaces",b)},this.createWorkspace=function(a){if(Storage.consistencyWorkspace(),Storage.hasWorkspace(a.name))throw"name_conflict";var b=$.jStorage.get("workspaces");b.push(a),$.jStorage.set("workspaces",b)},this.deleteWorkspace=function(a){Storage.consistencyWorkspace();var b=$.jStorage.get("workspaces");for(var c in b){var d=b[c];d.name==a&&b.splice($.inArray(d,b),1)}$.jStorage.set("workspaces",b)},this.loadProbandData=function(a,b){return a.proband_data[b]},this.getProbands=function(a){return a.proband_data},this.saveProbandData=function(a,b,c){Storage.consistencyWorkspace(),a.proband_data[b]=c,Storage.saveWorkspace(a)},this.deleteProbandData=function(a,b){Storage.consistencyWorkspace();var c=a.proband_data;delete c[b],Storage.saveWorkspace(a)},this.importWorkspaces=function(a){if(Storage.consistencyWorkspace(),Array.isArray(a))for(var b=0;b<a.length;b++)Storage.createWorkspace(a[b]);else Storage.createWorkspace(a)}};window.Storage=Storage;var Calculations=function(){this.getInteractionTypeFrequencyArray=function(a){var b,c={};for(var d in a){var e=a[d];b=e.interaction_type,b in c?c[b]++:c[b]=1}var f=[];for(b in c){var g=b+" ("+c[b]+")";f.push([g,c[b]])}return f}};window.Calculations=new Calculations;