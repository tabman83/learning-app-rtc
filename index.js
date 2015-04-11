/*
file:           index.js
author:         Antonino Parisi
email:          tabman83@gmail.com
date:           11/04/2015 16:30
description:    main server file
*/

var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ routes: { cors: true } });
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
			index: true,
            path: './dist'
        }
    }
});
server.start(function(err) {
    if(err) {
		console.error(err);
        return;
    }
    console.log('Server started @ ' + server.info.uri);
});
