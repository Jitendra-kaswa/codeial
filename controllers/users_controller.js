const User =require('../models/user'); // require database for post requests

module.exports.profile=function(req,res){ // show user profile
    User.findById(req.params.id,(err,user)=>{
        return res.render('profile',{
            title:"User Profile",
            profile_user:user
        });
    });
}

module.exports.update = function(req, res){ // update the user profile
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){ // user is already logined(session created)
        return res.redirect('/users/profile');
    }
    return res.render('signin',{
        title:'Sign In Page'
    })
};

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){ // user is already logined in (session created)
       return res.redirect('/users/profile');
    }

    return res.render('signup',{
        title:"Sign Up Page"
    })
};

// sign up for new users
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){ // check if password matches or not
        req.flash('error','Password is not matching');
        return res.render('signup',{
            title:"Sign Up Page",
            // error_message:" *Password doesn't match palease enter carefully"
        })
    }
    User.findOne({email:req.body.email},(err,user)=>{ // check if user already exists or not
        if(err) {console.log("error in fingding the user");return} // ther is some error in finding the user
        
        if(user){             // user exists in the database  
            req.flash('error','User is already exists');                     
            return res.render('signup',{
                title:"Sign Up Page",
                // error_message:" *User is already exists Please Sign Up with another account"
            })
        }
        User.create({ // user doesn't exists, create the account
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.signout=function(req,res){
    req.logout(); // it will destroy the session
    req.flash('success','You have logged out!');
    return res.redirect('/');
}

