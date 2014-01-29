var Utils = function() {
    this.generateChecksum = function(data) {
        return $.sha256(data);
    };
};

window.Utils = new Utils();
