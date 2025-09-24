const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const HomeSchema = mongoose.Schema({
    image:{
        type: String,
    },
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    description: String
});

module. exports = mongoose.model("Home", HomeSchema);




  
        
    // save()
    // static find()
    // static findById(HomeID)
    // static DeleteById(HomeID)
        