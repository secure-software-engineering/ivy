var Converter = (function() {
    var Converter = function() {};

    Converter.prototype.load = function(data) {
        this.data = $.extend(true, {}, data);

        // Create empty fields.
        this.interactions = [];
        this.comments = {};
        this.diary = [];
        this.privacy = {};
    };

    Converter.prototype.convertInteractions = function() {
        for (var i in this.data.platforms) {
            var platform = this.data.platforms[i];

            for (var j in platform.interactions) {
                var interaction = platform.interactions[j];

                var converted = {};

                converted.nr = interaction.index;

                // skip interactions without record information
                if (interaction.record == null) {
                    continue;
                }

                converted.interaction_type = interaction.record.type;
                converted.time = interaction.createdAt;
                converted.network = platform.name;

                if (converted.interaction_type === 'open') {
                    converted.interaction_type = 'openFacebook';
                    converted.time = interaction.record.time;
                } else if (converted.interaction_type === 'close') {
                    converted.interaction_type = 'closeFacebook';
                    converted.time = interaction.record.time;
                }

                if (interaction.record.object !== undefined) {
                    converted.object_id = interaction.record.object.id;
                    converted.object_owner = interaction.record.object.owner;
                    converted.object_type = interaction.record.object.type;

                    if (interaction.record.object.recipient !== undefined) {
                        converted.object_id = interaction.record.object.recipient;
                    }
                }

                if (interaction.record.type === 'commentstatus') {
                    converted.object_id = interaction.record.target.id;
                    converted.object_owner = interaction.record.target.owner;
                }

                if (interaction.record.page !== undefined) {
                    converted.object_id = interaction.record.page;
                }

                if (interaction.record.friend !== undefined) {
                    converted.object_id = interaction.record.friend;
                }

                this.interactions.push(converted);
            }
        }
    };

    Converter.prototype.convertComments = function() {
        for (var i in this.data.platforms) {
            var platform = this.data.platforms[i];

            for (var j in platform.comments) {
                var comment = platform.comments[j];

                var text = comment.record.text;
                var time = new Date(comment.createdAt);
                var utime = Math.floor(time.getTime() / 1000);

                var key;
                if (comment.record.id != null) {
                    key = comment.record.id;
                } else {
                    key = Math.floor(utime / 100);
                }

                this.comments[key] = utime + ' ~ ' + text;
            }
        }
    };

    Converter.prototype.convertDiary = function() {
        for (var j in this.data.diary) {
            var entry = this.data.diary[j];

            this.diary.push([
                entry.createdAt,
                entry.content
            ]);
        }
    };

    Converter.prototype.convertPrivacySettings = function() {
        for (var j in this.data.diary) {
            var entry = this.data.diary[j];

            this.diary.push([
                entry.createdAt,
                entry.content
            ]);
        }
    };

    Converter.prototype.convertPrivacySettings = function() {
        var platform, privacySettings, timelineSettings, _i, _len, _ref, _ref1, _ref2;
        _ref = this.data.platforms;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            platform = _ref[_i];
            if ((((_ref1 = platform.static) != null ? _ref1['privacy-settings'] : void 0) != null) && (((_ref2 = platform.static) != null ? _ref2['timeline-settings'] : void 0) != null)) {
                privacySettings = platform.static['privacy-settings'].pop();
                timelineSettings = platform.static['timeline-settings'].pop();
                this.privacy.standard = privacySettings;
                this.privacy.timeline = timelineSettings;
            }
        }
    };

    Converter.prototype.convert = function() {
        var converted = {};

        // Convert data.
        this.convertInteractions();
        this.convertComments();
        this.convertDiary();
        this.convertPrivacySettings();

        // Add converted data to new data fields.
        converted.interactions = this.interactions;
        converted.comments = this.comments;
        converted.diary = this.diary;
        converted.privacy = this.privacy;

        return converted;
    };

    return Converter;
})();
