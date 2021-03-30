const Post = require('../models/post');
const Comment=require('../models/comment');
module.exports.home=function(req,res){

    // populating the object 

    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec((err,posts)=>{
        return res.render('home',{
            title: "Home",
            posts:posts
        });
    })
    
}