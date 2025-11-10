const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    Firstname:{
        type: String,
        required: [true, 'First name is required']
    },
    Lastname: {
        type:String,
    },
    Email:{
        type: String,
        required:[true, 'email is required'],
        unique : true
    },
    password:{
        type: String,
        required:[true, 'password is required']
    },
    userType:{
        type: String,
        enum:['Guest', 'Host'],
        default:'Guest'
    }
});

module.exports = mongoose.model('User', userSchema);