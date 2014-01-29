/* Resize Timer ID. */
window.resizeTimerID = null;

function bodyOnResize() {
	if(resizeTimerID == null) {
		resizeTimerID = window.setTimeout(function() {
			resizeTimerID = null;
			Globals.getTimeline().layout();
		}, 500);
	}
}