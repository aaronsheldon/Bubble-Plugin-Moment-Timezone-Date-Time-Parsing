async function(properties, context) {
	var tzutil = require("moment-timezone");
    var formatmodel = properties.formatoverride;
    var datestring = properties.datestring;
    var datedelimited = properties.datedelimited;
    var timedelimited = properties.timedelimited;
    
    // Protect from invalid input
    if (!datestring) {
        return {
        	datetime: null,
            utcmilliseconds: null
        };
    }
    
    // Global time zone for process
    tzutil.tz.setDefault(properties.timezone);
    
    // Format model override
    if (!!formatmodel) {
        var utcdate = tzutil(datestring, formatmodel);
        
        // Send
        if (utcdate.isValid()) {
            return {
                datetime: new Date(utcdate.valueOf()),
                utcmilliseconds: utcdate.valueOf()
            };
        }
    }
    
	// Start with the date format model
    switch (properties.dateorder) {
        case "year month day":
            formatmodel = datedelimited ? "Y.M.D" + (timedelimited ? "." : "D") : "YYYYMMDD";
            break;
        case "year day month":
            formatmodel = datedelimited ? "Y.D.M" + (timedelimited ? "." : "M") : "YYYYDDMM";
            break;
        case "month year day":
            formatmodel = datedelimited ? "M.Y.D" + (timedelimited ? "." : "D") : "MMYYYYDD";
            break;
        case "month day year":
            formatmodel = datedelimited ? "M.D.Y" + (timedelimited ? "." : "YYY") : "MMDDYYYY";
            break;
        case "day year month":
            formatmodel = datedelimited ? "D.Y.M" + (timedelimited ? "." : "M") : "DDYYYYMM";
            break;
        default:
            formatmodel = datedelimited ? "D.M.Y" + (timedelimited ? "." : "YYY") : "DDMMYYYY";
    }
    
    // Finish with the time format model
    if (-1 < datestring.search(/[AP]/gi)) {
        formatmodel = formatmodel + (timedelimited ? "h.m.s.S.A" : "hhmmssSA");
    }
    else {
        formatmodel = formatmodel + (timedelimited ? "H.m.s.S" : "HHmmssS");
    }
    
    // Construct the UTC date
    var utcdate = tzutil(datestring, formatmodel);
    
  	// Bail on bad date
    if (!utcdate.isValid()) {
        return {
        	datetime: null,
            utcmilliseconds: null
        };
    }
    
    // Send
    return { 
        datetime: new Date(utcdate.valueOf()),
        utcmilliseconds: utcdate.valueOf()
    };
}