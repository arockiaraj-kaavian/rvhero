 const mongoose = require('mongoose');

 const note=new mongoose.Schema({
    hobby1:{type:String},
    date:{type:String}
 }, 
    {collection:'notes'});

    const notes = mongoose.model('notes',note);

module.exports={notes};