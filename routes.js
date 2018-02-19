var handlers = require("./handlers.js");
var routes = [

	{   method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file("index.html");
        }
    },


	{	method: 'GET',
        path: '/style.css',
        handler: function (request, reply) {
            reply.file("style.css");
        }
    },


    {	method: 'GET',
        path: '/script.js',
        handler: function (request, reply) {
            reply.file("script.js");
        }
    },

		{	method: 'GET',
        path: '/tasks.js',
        handler: function (request, reply) {
            reply.file("tasks.js");
        }
    },

		{	method: 'GET',
        path: '/favicon.ico',
        handler: function (request, reply) {
            reply.file("favicon.ico");
        }
    },

    {   method: 'GET',
        path: '/jquery.js',
        handler: function (request, reply) {
            reply.file("jquery.js");
        }
    },

	//
	// {   method: 'PUT',
  //       path: '/tasks.js',
	// 			handler: function (request, reply) {
	// 				reply.file("tasks.js");
  //   },

    // {   method: 'GET',
    //     path: '/load',
    //     handler: handlers.load
    // }

];

module.exports = routes;
