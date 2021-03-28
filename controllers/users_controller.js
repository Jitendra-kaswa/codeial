const Users =require('../models/user'); // require database for post requests
module.exports.profile=function(req,res){
    return res.render('profile',{
        title:"User Profile",
        css_link:"/css/profile.css",
        js_link:"/js/profile.js"
    });
}

module.exports.signin=function(req,res){
    return res.render('signin',{
        title:'Sign In Page',
        css_link:"/css/signin.css",
        js_link:"/js/signin.js"
    })
};

module.exports.signup=function(req,res){
    return res.render('signup',{
        title:"Sign Up Page",
        css_link:"/css/signup.css",
        js_link:"/js/signup.js"
    })
};

module.exports.create=function(req,res){
    Users.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    },(err,newAccount)=>{
        if(err){
            console.log("error in creating account");
            return;
        }
        console.log('*******',newAccount);
        return res.redirect('sign-in');
    });
}

module.exports.create_session = function(req,res){
    res.send("Jai Hind")
}