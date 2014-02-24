VLC Http Service
=========

**droopy-vlc** is an HTTP service that sends commands to VLC's HTTP endpoint.

##Example Usage

After installing the npm module (droopy-vlc), you can require the service and start controlling Vlc. 
```sh
>>npm install droopy-vlc
```
```javascript
var VlcService = require("droopy-vlc"),
    vlc = new VlcService("http://:password@localhost:8080");

vlc.volume(80).then(function(vlcStatus) {
	console.log("Successfully set volume to " + vlcStatus.volume);
});

```

## VLC Status
All methods return Q promises that resolve with a **VlcStatus** object
```javascript
{
	fullscreen: 'false',
	aspectRatio: 'default',
	time: '1264',
	timeDisplay: '21:04',
	volume: '0',
	duration: '6572',
	durationDisplay: '1:49:32',
	state: 'playing',
	rate: '1',
	position: '0.19233977794647',
	filename: 'myvideofile.avi'
}
```


##Supported Methods
####status()
Passes back a `VlcStatus` object.
```javascript
vlcService.status().then(function(status) {
	console.log(status); //You could continuously poll this
});
```

####seek(time)
Requires a time parameter in seconds.
```javascript
//move the the 2 minute mark
vlcService.seek(120).then(function(status) {
	console.log(status);
});
```

####volume(val)
Requires a volume level between 0 and 200.
```javascript
//max volume
vlcService.volume(125).then(function(status) {
	console.log(status);
});
```

####togglePause()
If currently paused the video will play, otherwise pause.
```javascript
vlcService.togglePause().then(function(status) {
	//statue.state will be "paused" or "playing"
	console.log(status);
});
```

####fullscreen()
If currently fullscreen, it will shrink the window, else make it fullscreen
```javascript
vlcService.fullscreen().then(function(status) {
	//statue.fullscreen will be "true" or "false"
	console.log(status);
});
```

####rate(speed)
Adjusts the playback speed. Unfortunately I couldn't find a way to make it go backwords like a "rewind"
```javascript
//Play 3 times as fast (fast forward)
vlcService.rate(3).then(function(status) {
	console.log(status);
});
```

## Enabling VLC Http Endpoint

VLC's Http endpoint is not enabled by default.  You can enable by launching VLC with a `--etraintf http` flag.  [VideoLan documentation](http://www.videolan.org/doc/vlc-user-guide/en/ch05.html)

UPDATE: New versions now require you to setup a password to access the HTTP endpoint.  To do this go to Tools -> Preferences -> Main Interfaces -> Lua -> Lua HTTP Password.

```bat
>>C:\Program Files (x86)\VideoLAN\VLC\vlc.exe -f <filepath> --etraintf http
```

## Opening and closing VLC with node.js
The following are helper methods that I use to launch and close VLC on Windows PC.

```javascript
exec = require('child_process').exec;

var killVlc = function() {
	try {
		//var cmd = 'tasklist /fi "ImageName eq vlc.exe" /fo csv /nh';
		var cmd = 'taskkill /IM vlc.exe';
		var child = exec(cmd, function(err, stdout, stderr) {
			if (err) {
				console.log(err);
				console.log(stderr);
			}
		});
	} catch (ex) {
		console.log("kill catch");
	}
};

var launchVlc = function(filepath) {
	var params = " -f " + " \"" + filepath + "\" --extraintf http";
	    
	var child = exec(options.exePath + params, function(err, stdout, stderr) {
		if (err) {
			console.log(err);
			console.log(stderr);
		}
	});
};
```
