const Post = require('../models/post')
const Comment =require('../models/comment')
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}
        
        console.log("New Post has been created");
        return res.redirect('/');
    });
}

module.exports.destroy= function(req,res){
    Post.findById(req.params.id,(err,post)=>{
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},(err)=>{
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}