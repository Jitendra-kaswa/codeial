const Post = require('../models/post')
const Comment =require('../models/comment')

module.exports.create = async function(req, res){
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // }, function(err, post){
    //     if(err){console.log('error in creating a post'); return;}
        
    //     console.log("New Post has been created");
    //     return res.redirect('/');
    // });

    // converting the above code into async await
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('/');
    }
    catch(err){
        console.log("Errot", err);
        return ;
    }
}

module.exports.destroy= async function(req,res){
    // Post.findById(req.params.id,(err,post)=>{
    //     // .id means converting the object id into string
    //     if(post.user == req.user.id){
    //         post.remove();
    //         await Comment.deleteMany({post:req.params.id},(err)=>{
    //             return res.redirect('back');
    //         })
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })

    // converted the above code into async await

    try{
        let post= await Post.findById(req.params.id)

        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id})
        }
        return res.redirect('back');
    }
    catch(err){
        console.log("Errer",arr);
        return ;
    }
}