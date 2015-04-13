var Boom = require('boom');
var routes = [{
	method: 'GET',
	path: '/api/user',
	config: {
        handler: function(request, reply) {
            var err = null;
            if (err) {
                return reply(Boom.badImplementation(err));
            }

            reply(Boom.unauthorized());
        }
	}
}, {
	method: 'GET',
	path: '/api/user/:id',
	config: {
		handler: function(request, reply) {
            reply( { message: request.query.id } );
        }
	}
}];

module.exports.routes = function (server) {
	server.route(routes);
};
