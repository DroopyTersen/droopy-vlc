var VlcService = require("./VlcService");
var service = new VlcService("http://:rival5sof@localhost:8080");

service.status().then(function (status) {
	console.log(status);
});

service.fullscreen();
service.volume(0);