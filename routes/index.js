var user = require('./user');
var website = require('./website');

module.exports = function (server) {
	user.routes(server);
	website.routes(server);
};
