var HttpService = require("droopy-http"),
	VlcStatus = require("./VlcStatus"),
	VlcPlaylist = require("./VlcPlaylist"),
	q = require("q");

var VlcService = function(url) {
	this.baseUrl = url;
};

VlcService.prototype = new HttpService();

/**
 * command : comando,
 * value : value,
 * valueName : valueName
 */

VlcService.prototype._statusRequest = function(command, value,valueName) {
	var deferred = q.defer();
	var url = this.baseUrl + "/requests/status.xml";
	if (command) {
		url += ("?command=" + command);
		if (value) {
			url += ("&" + (valueName || "input") + "=" + value);
		}
		console.log(url);
	}
	this.get(url, {}, true).then(function(xml) {
		var status = new VlcStatus(xml);
		deferred.resolve(status);
	}).fail(function(){
		deferred.reject(arguments);
	});
	return deferred.promise;
};
VlcService.prototype._playlistRequest = function() {
	var deferred = q.defer();
	var url = this.baseUrl + "/requests/playlist.xml";
	console.log(url);
	this.get(url, {}, true).then(function(xml) {
		var status = new VlcPlaylist(xml);
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
	return this._statusRequest("volume", v,"val");
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
VlcService.prototype.next = function() {
	return this._statusRequest("pl_next");
};
VlcService.prototype.previous = function() {
	return this._statusRequest("pl_previous");
};
VlcService.prototype.enqueque = function(item) {
	return this._statusRequest("in_enqueue",item);
};
VlcService.prototype.play = function(id) {
	return this._statusRequest("pl_play",id,"id");
};
VlcService.prototype.stop = function(id) {
	return this._statusRequest("pl_stop",id,"id");
};
VlcService.prototype.deleteItem = function(id) {
	return this._statusRequest("pl_delete",id,"id");
};
VlcService.prototype.empty = function() {
	return this._statusRequest("pl_empty");
};
/**
 * Get the playlist
 * @return [{name : String,duration : Number,id : Number},]
 */
VlcService.prototype.playlist = function() {
	return this._playlistRequest();
};
/**
 * Loop the entire playlist
 */
VlcService.prototype.loop = function() {
	return this._statusRequest("pl_loop");
};
/**
 * Repeat the last item
 */
VlcService.prototype.repeat = function() {
	return this._statusRequest("pl_repeat");
};


module.exports = VlcService;