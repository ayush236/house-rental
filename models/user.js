const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Firstname:{
        type: String,
        required: [true, 'First name is required']
    },
    Lastname: {
        type:String,
    },
    Email:{
        type: String,
        require:[true, 'email is required'],
        unique : true
    },
    password:{
        type: String,
        require:[true, 'password is required']
    },
    userType:{
        type: String,
        enum:['Guest', 'Host'],
        default:'Guest'
    }
});

module.exports = mongoose.model('User', userSchema);