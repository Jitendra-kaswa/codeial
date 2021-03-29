const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const path=require('path');
const cookieParser = require('cookie-parser');
const port=9833;
const app=express();


const db=require('./config/mongoose'); // This is used to import database from the folder

// used for session cookie
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.use(expressLayouts);
app.use(express.urlencoded({extended:true})); // encoding for post request
app.use(cookieParser());

//app.use("/customCss",express.static(path.join(__dirname,"assets/css")));
app.use(express.static('assets'));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("node_modules/bootstrap/dist/js"));
app.use(express.static("node_modules/jquery/dist"));

//mongo-store is used to store the session cookie in the db
app.use(session({
    name:'codial',
    // TODO change the secret before deployment in production
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        (err)=>{
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router 
app.use('/',require('./routers'));

app.listen(port,(err)=>{
    if(err)
        console.log(`Error running the server: ${err}`);
    console.log(`Server is running on the port ${port}`);
});