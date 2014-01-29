'use strict';

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {
		return defineComponent(animation);

		function animation() {
			this.animateSaveWorkspace = function(ev, data) {
				// Animate Save Workspace button.
				$("#saveWorkspaceButton").animate({
					opacity: 0.25
				}, 1000, function() {
					$("#saveWorkspaceButton").animate({
						opacity: 1
					}, 1000);
				});
			};

			this.animateShowSaveWorkspaceButton = function(ev, data) {
				// Show Save Workspace button.
				$("#saveWorkspaceButton").show();
			};

			this.setWorkspaceName = function(ev, data) {
				// Get current workspace name.
				var workspaceName = Globals.getWorkspace()['name'];

				// Set name.
				$(".workspace-information").html($.t("workspaces.loaded-information") + workspaceName);
			}

			this.animateShowModal = function(ev, data) {
				// Get header.
				var header = data.header;

				// Get body text.
				var text = data.text;

				// Fill modal.
				$("#modal-box .modal-header h3").attr("data-i18n", header).i18n();
				$("#modal-box .modal-body p").attr("data-i18n", text).i18n();

				// Show modal.
				$("#modal-box").show();
			};

			this.animateDropToNormal = function(ev, data) {
				// Set background color of drop area.
				$(".drag-n-drop-area").css('background-color', 'white');

				// Set title.
				$(".drag-n-drop-area").find(".caption").attr("data-i18n", "drop.information").i18n();
			};

			this.animateAcceptDrop = function(ev, data) {
				// Set background color of drop area.
				$(".drag-n-drop-area").css('background-color', '#90EE90');

				// Set title.
				$(".drag-n-drop-area").find(".caption").attr("data-i18n", "drop.accepted").i18n();
			};

			this.disableTopNavigationLinks = function(ev, data) {
				// Disable top navigation links.
				$('a[identifier="ivy.proband"]').parent().addClass("disabled");
				$('a[identifier="ivy.statistics"]').parent().addClass("disabled");
				$('a[identifier="ivy.timeline"]').parent().addClass("disabled");
			};

			this.enableTopNavigationLinks = function(ev, data) {
				// Enable top navigation links.
				$('a[identifier="ivy.proband"]').parent().removeClass("disabled");
				$('a[identifier="ivy.statistics"]').parent().removeClass("disabled");
				$('a[identifier="ivy.timeline"]').parent().removeClass("disabled");
			};

			this.after('initialize', function() {
				this.on('uiAnimateSaveWorkspace', this.animateSaveWorkspace);
				this.on('uiAnimateShowSaveWorkspaceButton', this.animateShowSaveWorkspaceButton);
				this.on('uiAnimateShowModal', this.animateShowModal);
				this.on('uiAnimateDropToNormal', this.animateDropToNormal);
				this.on('uiAnimateAcceptDrop', this.animateAcceptDrop);
				this.on('uiAnimateSetWorkspaceName', this.setWorkspaceName);
				this.on('uiDisableTopNavigationLinks', this.disableTopNavigationLinks);
				this.on('uiEnableTopNavigationLinks', this.enableTopNavigationLinks);
			});
		}
	}
);