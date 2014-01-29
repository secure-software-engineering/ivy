'use strict';

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {
		return defineComponent(configuration);

		function configuration() {
			this.after('initialize', function() {
			});
		}
	}
);