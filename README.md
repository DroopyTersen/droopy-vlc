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
    vlc = new VlcService("http://localhost:8080");

vlc.volume(80).then(function(vlcStatus) {
	console.log("Successfully set volume to " + vlcStatus.volume);
});

```

## Enabling VLC Http Endpoint

VLC's Http endpoint is not enabled by default.  You can enable by launching VLC with a `--etraintf http` flag.  [VideoLan documentation](http://www.videolan.org/doc/vlc-user-guide/en/ch05.html)

```bat
>>C:\Program Files (x86)\VideoLAN\VLC\vlc.exe -f <filepath> --etraintf http
```
## VLC Status
All methods return Q promises that resolve with a **VlcStatus** object
* `fullscreen` - 
* `volume` - an integer [0 - 200]
* `time` - MM.SS
* `duration`
* `state`
* `rate`
* `position`

##Supported Methods
####status()
Passes back a `VlcStatus` object.

####seek(time)
Requires a time parameter in seconds.

####volume(val)
Requires a volume level between 0 and 200.

####togglePause()
If currently paused the video will play, otherwise pause.
