const  mongoose = require('mongoose')


const favouriteSchema = mongoose.Schema({
    HomeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "home",
        required : true,
        unique: true
    }
})


module.exports = mongoose.model('favourite', favouriteSchema);