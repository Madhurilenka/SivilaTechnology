const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"User",trim:true},
    description:{type:String, max:500,trim:true},
    img:{type:String, trim:true},
    likes: { type:Array, default:[] },
    comments: { type:Array, max:100 },
    Dimonds: { type:Array, default:[] },
    
    
},
    { timestamps: true });


module.exports = mongoose.model("Post", PostSchema)