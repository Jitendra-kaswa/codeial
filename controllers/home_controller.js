const Post = require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');

module.exports.home= async function(req,res){

    // populating the object 

    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Home",
    //         posts:  posts
    //     });
    // })

    // populating the object with the post and comment
    
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec((err,posts)=>{
    //     return res.render('home',{
    //         title: "Home",
    //         posts:posts
    //     });
    // })

    // Now to display all the users we have to pass all the users list
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec((err,posts)=>{
    //     User.find({},(err,users)=>{
    //         return res.render('home',{
    //             title: "Home",
    //             posts:posts,
    //             all_users:users
    //         });
    //     });
    // })

    // Using the above work using async await

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path:'comments',
            populate:{
                path:'user'
            }
        });

        let users = await User.find({});

        return res.render('home',{
            title: "Home",
            posts:posts,
            all_users:users
        });
    }
    catch(err){
        console.log(err);
        return ;
    }
}