var mongo = require("./mongo.js");
var handlers = {
	"save": function (request, reply) {
		console.log("elephants", request.payload)
		var todo = {todo:request.payload.list[0]};
		mongo.insertDocuments("todo", todo, function(error, data) { //collection, doc, callback function
			if (error) {
				console.log(error, "ZOMG ERROR")
			}
			else {
				console.log(data, "IT WORKED - WOOP WOOP")
			}
		});
	},

// 	"load": function (request, reply) {
// 		mongo.loadToDos(function(error, data) { //callback function
// 			if (error) {
// 				console.log(error, "ZOMG ERROR")
// 			}
// 			else {
// 				for (var i = start; i < data.length; i++) {
// 					'<input type="text" class="todo" value="'+data[i].text+'"/><input type="checkbox">'
// 				}
//
// 				console.log(data, "IT WORKED - WOOP WOOP");
// 			}
// 		});
};

module.exports = handlers;
