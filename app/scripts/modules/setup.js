'use strict';

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {
		return defineComponent(setup);

		function setup() {
			this.after('initialize', function() {
				// Load workspaces area.
				this.trigger('uiPageLoadRequested', {
					identifier: 'ivy.workspaces',
					stage: 'state',
					eventAfterLoad: ['dataListWorkspaces', 'uiAnimateDropToNormal', 'uiDisableTopNavigationLinks']
				});
			});
		}
	}
);