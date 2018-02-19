var env = require('env2')('./config.env');
var mongodb = require("mongodb");
var url = process.env.MONGOLAB || "mongodb://localhost:8080/mytodo"; //last bit is a bit redundant
console.log(process.env.MONGOLAB); // "127.0.0.1"
var MongoClient = mongodb.MongoClient;
// console.log(url);
var mongoHandlers = {};

mongoHandlers.insertDocuments = function(collection, doc, callback) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}
		else { //this ACTUALLY talks to the database
	    	console.log('Connection established to', url);
			db.collection(collection).insert(doc, function(err, data) {
				db.close();
				if (err) {
					callback(err, null);
				}
				else {
					callback(null, data); //runs calback --> no error, sends data
				}
			});
		}
	});
};

mongoHandlers.loadToDos =  function(callback) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}
		else { //this ACTUALLY talks to the database
	    	console.log('Connection established to', url);
			db.collection('todo').find({}).toArray(function(err, data) {
				db.close();
				if (err) {
					callback(err, null);
				}
				else {
					callback(null, data); //runs calback --> no error, sends data
				}
			});
		}
	});
};



module.exports = mongoHandlers;
