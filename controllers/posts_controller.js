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
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({ //used to send data back to the dom
                data:{
                    post:post
                },
                message:"Post Created!"
            });
        }

        req.flash('success','Post Published Successfully')
        return res.redirect('back');
    }
    catch(err){
        req.flash('error','Error in Publishing the post')
        return res.redirect('back');
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

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message : "post deleted"
                });
            }

            req.flash('success','Post and associated comments deleted Successfully !!')
            return res.redirect('back');
        }
        else{
            req.flash('error','You cannot delete this post !!')
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','Error in deleting the post')
        return res.redirect('back');
    }
}