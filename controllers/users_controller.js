const Users =require('../models/user'); // require database for post requests
module.exports.profile=function(req,res){
    return res.render('profile',{
        title:"User Profile"
    });
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signin',{
        title:'Sign In Page'
    })
};

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('signup',{
        title:"Sign Up Page"
    })
};


module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){ // check if password matches or not
        return res.render('signup',{
            title:"Sign Up Page",
            error_message:" *Password doesn't match palease enter carefully"
        })
    }
    Users.findOne({email:req.body.email},(err,user)=>{ // check if user already exists or not
        if(err) {console.log("error in fingding the user");return} // ther is some error in finding the user
        
        if(user){             // user exists in the database                       
            return res.render('signup',{
                title:"Sign Up Page",
                error_message:" *User is already exists Please Sign Up with another account"
            })
        }
        Users.create({ // user doesn't exists, create the account
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
    })
}

// sign in and create session for the user
module.exports.create_session = function(req,res){
    return res.redirect('/');
}

module.exports.signout=function(req,res){
    req.logout();
    return res.redirect('/');
}