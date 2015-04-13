var routes = [{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
			index: true,
            path: './dist'
        }
    }
}];

module.exports.routes = function (server) {
	server.route(routes);
};
