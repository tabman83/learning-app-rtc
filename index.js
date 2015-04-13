/*
file:           index.js
author:         Antonino Parisi
email:          tabman83@gmail.com
date:           11/04/2015 16:30
description:    main server file
*/

var Hapi = require('hapi');
var routes = require('./routes/');

var server = new Hapi.Server();
server.connection({
    address: process.env.IP || '127.0.0.1',
    port: process.env.PORT || 4000,
    routes: {
        cors: true
    }
});
routes(server);

server.start(function(err) {
    if(err) {
		console.error(err);
        return;
    }
    console.log('Server started @ ' + server.info.uri);
});
