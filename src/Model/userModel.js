const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: { type:String, required:true,trim:true },
    phone: { type:String, required:true, unique:true,trim:true },
    email: { type:String, required:true,  unique:true,trim:true },
    password: { type:String, required:true,trim:true},
    likes: { 
        recive:{type:Number,default:0},
        did:{type:Number,default:0}
     },
    comments: {  
        recive:{type:String,max:100},
        did:{type:String,max:100}
 },
    Diamonds: { 
        recive:{type:Number,default:0},
        did:{type:Number,default:0}
     },
    
},
    { timestamps: true });


module.exports = mongoose.model("User", UserSchema)