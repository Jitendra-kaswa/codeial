const User =require('../models/user'); // require database for post requests

module.exports.profile=function(req,res){ // show user profile
    User.findById(req.params.id,(err,user)=>{
        return res.render('profile',{
            title:"User Profile",
            profile_user:user
        });
    });
}

module.exports.update = async function(req, res){ // update the user profile
    // if(req.user.id == req.params.id){
    //     let user = await User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error','Unauthorised!');
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadAvatar(req,res,function(err){
                if(err){console.log('******Multer error:',err)};
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    // this is saving the path of the uploading file into the avatar field in the user
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                console.log(user);
                return res.redirect('back');
            });
        }
        catch(error){
            req.flash('error',err);
            return res.redirect('back')
        }
    }else{
        req.flash('error','Unauthorised!');
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
        return res.render('signup',{
            title:"Sign Up Page",
            // error_message:" *Password doesn't match palease enter carefully"
        })
    }
    User.findOne({email:req.body.email},(err,user)=>{ // check if user already exists or not
        if(err) {console.log("error in fingding the user");return} // ther is some error in finding the user
        
        if(user){             // user exists in the database                      
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

