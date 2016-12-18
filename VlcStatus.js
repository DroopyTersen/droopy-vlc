var XmlDoc = require('xmldoc').XmlDocument;

var secondsToTimestamp = function (seconds) {
	var extraSeconds = seconds % 60;
	var minutes = (seconds - extraSeconds) / 60;
	var extraMinutes = minutes % 60;
	var hours = (minutes - extraMinutes) / 60;

	var timestamp = "";
	if (hours > 0) {
		timestamp += hours + ":";
	}
	if (hours > 0 && extraMinutes < 10) {
		timestamp += "0" + extraMinutes + ":";
	} else {
		timestamp += extraMinutes + ":";
	}
	if (extraSeconds < 10) {
		timestamp += "0" + extraSeconds;
	} else {
		timestamp += "" + extraSeconds;
	}

	return timestamp;
};

var VlcStatus = function(xmlString) {
	var doc = new XmlDoc(xmlString);
	this.fullscreen = doc.valueWithPath("fullscreen");
	this.aspectRatio = doc.valueWithPath("aspectratio");
	this.time = doc.valueWithPath("time");
	this.timeDisplay = secondsToTimestamp(this.time);
	this.volume = ((doc.valueWithPath("volume") * 200) / 512).toFixed(0);
	this.duration = doc.valueWithPath("length");
	this.durationDisplay = secondsToTimestamp(this.duration);
	this.currentId =  doc.valueWithPath("currentplid");
	this.loop = doc.valueWithPath("loop");
	this.state = doc.valueWithPath("state");
	this.repeat = doc.valueWithPath("repeat");
	this.random = doc.valueWithPath("random");
	this.rate = doc.valueWithPath("rate");
	this.position = doc.valueWithPath("position");
	this.filename = doc.descendantWithPath("information")
						.childWithAttribute("name", "meta")
						.childWithAttribute("name", "filename").val;
};

module.exports = VlcStatus;