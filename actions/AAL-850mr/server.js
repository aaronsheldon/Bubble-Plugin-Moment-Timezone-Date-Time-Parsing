async function(properties, context) {
	var tzutil = require("moment-timezone");
    return { names: tzutil.tz.names() };
}