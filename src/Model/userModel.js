const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: { type:String, required:true,trim:true },
    phone: { type:String, required:true, unique:true,trim:true },
    email: { type:String, required:true,  unique:true,trim:true },
    password: { type:String, required:true,trim:true},
    likes: { type:Array, default:[] },
    comments: { type:Array, max:100 },
    Dimonds: { type:Array, default:[] },
    
},
    { timestamps: true });


module.exports = mongoose.model("User", UserSchema)