import { Schema, model } from 'mongoose';

const userSchema = Schema({
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

export default model('User', userSchema);