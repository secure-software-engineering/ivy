'use strict';

define(
    [
        'components/flight/lib/component'
    ],

    function(defineComponent) {
        function dragdrop() {
            // Define attributes.
            this.defaultAttrs({
                dropzone: '.drag-n-drop-area'
            });

            this.noopHandler = function(e) {
                // Stop default events.
                e.stopPropagation();
                e.preventDefault();
            };

            this.handleDrop = function(e) {
                // Stop default events.
                e.stopPropagation();
                e.preventDefault();

                // Fix.
                e.dataTransfer = e.originalEvent.dataTransfer;

                // Get files.
                var files = e.dataTransfer.files;

                // Get amount of files.
                var count = files.length;

                // Check, if files have been dropped.
                if (count > 0) {
                    // Initialize file reader.
                    var reader = new FileReader();

                    // Set onload event.
                    reader.onload = function(loadEvent) {
                        // Store file.
                        Globals.setDropData(loadEvent.target.result);
                    };

                    // Load file.
                    reader.readAsText(files[0]);

                    // Update file name input field
                    this.trigger('updateFilename', {
                        fileName: files[0].name
                    });
                }

                // Show animation.
                // this.trigger('uiAnimateAcceptDrop');
            };

            this.after('initialize', function() {
                // Register no operation handlers.
                this.on('dragenter', {
                    dropzone: this.noopHandler
                });
                this.on('dragexit', {
                    dropzone: this.noopHandler
                });
                this.on('dragover', {
                    dropzone: this.noopHandler
                });

                this.on('drop', {
                    dropzone: this.handleDrop
                });
            });
        }

        return defineComponent(dragdrop);
    });
