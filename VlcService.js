var HttpService = require("droopy-http"),
	VlcStatus = require("./VlcStatus"),
	q = require("q");

var VlcService = function(url) {
	this.baseUrl = url + "/requests/status.xml";
};

VlcService.prototype = new HttpService();

VlcService.prototype._statusRequest = function(command, value) {
	var deferred = q.defer();
	var url = this.baseUrl;
	if (command) {
		url += ("?command=" + command);
		if (value) {
			url += ("&val=" + value);
		}
	}
	this.get(url, {}, true).then(function(xml) {
		var status = new VlcStatus(xml);
		deferred.resolve(status);
	}).fail(function(){
		deferred.reject(arguments);
	});
	return deferred.promise;
};


VlcService.prototype.status = function() {
	return this._statusRequest();
};

VlcService.prototype.seek = function(time) {
	return this._statusRequest("seek", time);
};

VlcService.prototype.volume = function(volume) {
	var v = ((volume * 512) / 200).toFixed(0);
	return this._statusRequest("volume", v);
};

VlcService.prototype.fullscreen = function() {
	return this._statusRequest("fullscreen");
};


VlcService.prototype.togglePause = function() {
	return this._statusRequest("pl_pause");
};

VlcService.prototype.rate = function(value) {
	return this._statusRequest("rate", value);
};

module.exports = VlcService;