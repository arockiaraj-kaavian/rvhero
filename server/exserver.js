const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser=require('body-parser');
const { connectToMongo, getDB } = require('./db-connection');
const { ObjectId } = require('mongodb');
app.use('/static', express.static('static'));
app.use(bodyParser.json({extended:true}));
const cors=require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/todo', (req, res) => {
	const db = getDB();
	const collection = db.collection("todo");
	collection.find({}).toArray().then(todoItems => {
		res.json(todoItems);
	});
});
app.get('/authors', (req, res) => {
	const db = getDB();
	const collection = db.collection("todo");
	collection.distinct("author").then(authors => {
		res.json(authors);
		
	});
});
app.get('/locations', (req, res) => {
	const db = getDB();
	const collection = db.collection("todo");
	collection.distinct("location").then(locations => {
		res.json(locations);
	});
});

app.get('/', (req, res) => {
	const HTML_FILE = fs.readFileSync('./index.html', { encoding: 'utf8' });
	res.send(HTML_FILE);
});
app.post('/filter',(req,res) =>{
	const {comp,todoauthors,todolocations,priority}=req.body;

	const db=getDB();
	const collection=db.collection("todo");
	const query={};
	if(comp){
		query.text=comp;
	}
	if(todoauthors){
		query.author=todoauthors;
	}
	if(todolocations){
		query.location=todolocations;
	}
	if(priority){
		query.priority=+priority;
		//console.log(typeof(+priority));
	}

	collection.findOne(query).toArray().then(answer =>{

		res.json(answer);
	});
});

app.delete('/todo/:id', (req, res) => {
	const { id } = req.params;
	const db = getDB();
	const collection = db.collection("todo");
	collection.deleteOne({ _id: ObjectId(id) });
	collection.find({}).toArray().then(todoItems => {
		res.json({ todoItems });
	});

});

connectToMongo()
	.then(() => {
		console.log("Database connected");

		app.listen(3000, () => {
			console.log("Application is running.");
		});
	})
	.catch(err => {
		console.log("Unable to bring up application.");
	});
