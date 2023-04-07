const express = require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
// const {connectToMongo,getDB} = require('./db-connection');
const {notes}=require('./schema');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000'}));

mongoose.set('strictQuery',false);

// mongoose.connect('mongodb://localhost:27017/practice');

mongoose.connect('mongodb://127.0.0.1:27017/practice');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('DB Connected correctly');
});

app.get('/view',async(req,res)=>{

    const data=await notes.find({});
    console.log(data);
    res.json(data);
})


app.post('/insert',async(req,res)=>{
const {hobby1,date}=req.body;
console.log(hobby1,date);
if(hobby1!=='' && date!==''){
await notes.create({hobby1:hobby1,date:date});
const data='Data inserted successfully';
res.json(data);
}else{
    const data='please enter the hobbies';
    res.json(data);
}
});
app.delete('/remove', (req, res) => {
	const { id } = req.params;
	const db = getDB();
	const collection = db.collection("notes");
	collection.deleteOne({ _id: ObjectId(id) });
	collection.find({}).toArray().then(data => {
		res.json({ data });
	});

});



app.listen(3001, () => {
    console.log("Server is running.");
		
});
	