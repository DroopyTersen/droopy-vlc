var XmlDoc = require('xmldoc').XmlDocument;

var convertTime = function (seconds) {
	var secs = seconds % 60;
	var minutes = (seconds - secs) / 60;
	return minutes + "." + secs;
};
var VlcStatus = function(xmlString) {
	var doc = new XmlDoc(xmlString);
	this.fullscreen = doc.valueWithPath("fullscreen");
	this.time = convertTime(doc.valueWithPath("time"));
	this.volume = ((doc.valueWithPath("volume") * 200) / 512).toFixed(0);
	this.duration = convertTime(doc.valueWithPath("length"));
	this.state = doc.valueWithPath("state");
	this.rate = doc.valueWithPath("rate");
	this.position = doc.valueWithPath("position");
};

module.exports = VlcStatus;