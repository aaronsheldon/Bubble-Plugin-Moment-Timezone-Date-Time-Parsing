async function(properties, context) {
	var tzutil = require("moment-timezone");
	var zone = tzutil.tz.zone(properties.name);
    if (!zone) {    
        return {
            abbreviations: null,
            milliseconduntils: null,
            minuteoffsets: null
        };        
    }    
	return {
        abbreviations: zone.abbrs.map(a => a || " "),
        milliseconduntils: zone.untils.map(u => u != null ? u : 0),
        minuteoffsets: zone.offsets.map(o => o != null ? o : 0)
    };
}