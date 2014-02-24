var VlcService = require("./VlcService");
var service = new VlcService("http://:password@localhost:8080");

service.status().then(function (status) {
	console.log(status);
});

service.fullscreen();
service.volume(0);
