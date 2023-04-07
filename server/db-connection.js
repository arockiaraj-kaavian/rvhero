const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
let db;

function connectToMongo() {
	return new Promise((resolve, reject) => {
		client.connect()
			.then(() => {
				db = client.db("practice");
				resolve();
			})
			.catch(err => {
				console.log('Error occured   connect to Database:', err);
				reject(err);
			});
	});
}

function getDB() {
	return db;
}

module.exports = {
	connectToMongo, getDB
};
