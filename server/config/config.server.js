'use strict';

module.exports = {
	SERVER_PORT: function() {
		if (process.env.PORT) {
			return process.env.PORT;
		}
		return 8080;
	}(),
	SERVER_MESSAGE: "Server Listening on "
};