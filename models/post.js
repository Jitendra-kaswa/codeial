const mongoose= require('mongoose');
const postSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include the ids of all the comments related to this post
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment' // 'comment'
        }
    ]
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);
module.exports=Post;