var XmlDoc = require('xmldoc').XmlDocument;


var VlcPlaylist = function(xmlString) {
	var doc = new XmlDoc(xmlString);
    this.playlist = [];
    var items = doc.descendantWithPath("node").childrenNamed("leaf");
    for(var i = 0; i < items.length; i++){
        this.playlist.push({
            name : items[i].attr.name,
            duration : items[i].attr.duration,
            id : items[i].attr.id,
            current : items[i].attr.current ? true :  false,
            position : 0
        });
    }
};

module.exports = VlcPlaylist;