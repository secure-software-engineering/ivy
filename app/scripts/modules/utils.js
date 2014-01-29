var Utils = new function() {
	this.generateChecksum = function(data) {
		return $.sha256(data);
	};
};

window.Utils = Utils;