const  mongoose = require('mongoose')


const favouriteSchema = mongoose.Schema({
    HomeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home",
        required : true,
        unique: true
    }
})


module.exports = mongoose.model('favourite', favouriteSchema);