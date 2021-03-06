const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =  async function(req, res){
    // Post.findById(req.body.post, function(err, post){

    //     if (post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err, comment){
    //             // handle error

    //             post.comments.push(comment);
    //             post.save();

    //             res.redirect('back');
    //         });
    //     }

    // });

    // convert the above code into async await

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            
            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success','Comment created Successfully !!')
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error','Error in Publishing the comment')
        return res.redirect('back');
    }
}

module.exports.destroy= async function(req,res){
    // Comment.findById(req.params.id,(err,comment)=>{
    //     if(comment.user== req.user.id || post.user.id==req.user.id){
    //          let postId= comment.post;
    //          comment.remove();

    //          Post.findByIdAndUpdate(postId,{$pull:{commetns:req.params.id}},(err,post)=>{
    //              return res.redirect('back');
    //          })
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })

    // converted the above code into async await 

    try{
        let comment = await Comment.findById(req.params.id)
        if(comment.user== req.user.id || post.user.id==req.user.id){
            let postId= comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId,{$pull:{commetns:req.params.id}});
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');

            // ,(err,post)=>{
            //     req.flash('success','Comment deleted Successfully !!')
            //     return res.redirect('back');
            // })
        }
        else{
            req.flash('error','You are not authorised to delete this comment')
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error in Publishing the comment')
        return res.redirect('back');
    }
}