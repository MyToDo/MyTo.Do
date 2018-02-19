var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: 8080
});

server.register(require('inert'), function (err) {

    if (err) {
        throw err;
    }

    server.route(require("./routes.js"));
    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
