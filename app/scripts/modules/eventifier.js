'use strict';

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {
		function eventifier() {
			// Define attributes.
			this.defaultAttrs({
				eventify: '.eventify'
			});

			this.eventify = function(e) {
				// Get node.
				var node = $(e.target);

				// Get event.
				var eventName = node.attr('event');

				// Trigger event.
				this.trigger(eventName);
			};

			// Set events.
			this.after('initialize', function() {
				this.on('click', {
					eventify: this.eventify
				});
			});
		}

		return defineComponent(eventifier);
	}
);
