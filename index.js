/*
file:           index.js
author:         Antonino Parisi
email:          tabman83@gmail.com
date:           11/04/2015 16:30
description:    main server file
*/

var Hapi = require('hapi');
var routes = require('./routes/');
var uuid = require('node-uuid');

var server = new Hapi.Server();
server.connection({
    address: process.env.IP || '192.168.21.8',
    port: process.env.PORT || 4000,
    routes: {
        cors: true
    }
});
routes(server);

var io = require('socket.io')(server.listener);
io.on('connection', function (socket) {

    var currentRoom, id;

    socket.on('init', function (data, fn) {
        currentRoom = (data || {}).room || uuid.v4();
        var room = rooms[currentRoom];
        if (!data) {
            rooms[currentRoom] = [socket];
            id = userIds[currentRoom] = 0;
            fn(currentRoom, id);
            console.log('Room created, with #', currentRoom);
        } else {
            if (!room) {
                return;
            }
            userIds[currentRoom] += 1;
            id = userIds[currentRoom];
            fn(currentRoom, id);
            room.forEach(function (roomSocket) {
                roomSocket.emit('peer.connected', { id: id });
            });
            room[id] = socket;
            console.log('Peer connected to room', currentRoom, 'with #', id);
        }
    });

    socket.on('msg', function (data) {
        var to = parseInt(data.to, 10);
        if (rooms[currentRoom] && rooms[currentRoom][to]) {
            console.log('Redirecting message to ', to, ' by ', data.by);
            rooms[currentRoom][to].emit('msg', data);
        } else {
            console.warn('Invalid user');
        }
    });

    socket.on('disconnect', function () {
        if (!currentRoom || !rooms[currentRoom]) {
            return;
        }
        delete rooms[currentRoom][rooms[currentRoom].indexOf(socket)];
        rooms[currentRoom].forEach(function (socket) {
            if (socket) {
                socket.emit('peer.disconnected', { id: id });
            }
        });
    });

});

server.start(function(err) {
    if(err) {
		console.error(err);
        return;
    }
    console.log('Server started @ ' + server.info.uri);
});
