const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new LocalStrategy({ // authentation using passport
    usernameField:'email'
    },function(email,password,done){
       
        User.findOne({email:email},(err,user)=>{  // fing a user and stablish the identity
            if(err){ console.log('err in fingding user -->passport');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user); // user is found
        })
    }
));

passport.serializeUser(function(user,done){ // serializing -> the user to decide which key to be kept in the cookies
    done(null,user.id);
});

passport.deserializeUser(function(id,done){ // deserialize the user from the key in the cookies
    User.findById(id,(err,user)=>{
        if(err){ console.log('err in fingding user -->passport');
            return done(err);
        }
        return done(null,user);
    });
});


// now send data to the user views
// for that we have to check authentication whether user is authorised for that data or not
passport.checkAuthentication= function(req,res,next){
    // if the user is authenticated,then pass the request to the next function(controller's action)
    if(req.isAuthenticated()){ // isAuthenticated is a inbuilt function 
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

// set views for the user
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current sign in user from the current session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;