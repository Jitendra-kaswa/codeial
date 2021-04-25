const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const path=require('path');
const cookieParser = require('cookie-parser');
const port=8000;
const app=express();


const db=require('./config/mongoose'); // This is used to import database from the folder

// used for session cookie
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// importing sass into project
const sassMiddleWare = require('node-sass-middleware');
app.use(sassMiddleWare({
    src:'./assets/scss', // from where to pick
    dest:'./assets/css', // where to put compiled files
    debug:true, // show the error if there are some while compilation
    outputStyle:'extended', // extended-> readable file(write in multiple lines), compressed-> non readable(write in single line)
    prefix:'/css' // prefix for css files
}))

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.use(expressLayouts);
app.use(express.urlencoded({extended:true})); // encoding for post request
app.use(cookieParser());

//app.use("/customCss",express.static(path.join(__dirname,"assets/css")));
app.use(express.static('assets'));
// makes the upload path available
app.use('/uploads',express.static(__dirname+'/uploads'));
// bootstrap and jquery file
// app.use(express.static("node_modules/bootstrap/dist/css"));
// app.use(express.static("node_modules/bootstrap/dist/js"));
// app.use(express.static("node_modules/jquery/dist"));

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

app.use(flash());
app.use(customMware.setFlash);
// use express router 
app.use('/',require('./routers'));

app.listen(port,(err)=>{
    if(err)
        console.log(`Error running the server: ${err}`);
    console.log(`Server is running on the port ${port}`);
});