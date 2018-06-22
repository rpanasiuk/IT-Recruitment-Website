const { exec } = require('child_process');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 

const url = 'mongodb://localhost:27017';
const dbName = 'hrjobs';

MongoClient.connect(url, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	const documents = function(db, callback) {

		db.listCollections().toArray((err, names) => {
			for (var i=0; i<names.length; i++) {
				if (names[i].name == 'system.indexes') {
					continue;
				}

				const str = 'mongoexport --db ' + dbName + ' --collection ' + names[i].name + ' --out ' + names[i].name + '.json' + ' --jsonArray --pretty';

				exec(str, (err) => {
					if (err) {return;}
				});
			}
			callback();
		})
	}

	documents(db, function() {
		console.log("Shutting down the server..");
		client.close();
	})
})