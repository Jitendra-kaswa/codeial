const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const path=require('path');
const port=9839;
const app=express();


const db=require('./config/mongoose'); // This is used to import database from the folder

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayouts);

app.use(express.urlencoded({extended:true})); // encoding for post request

//app.use("/customCss",express.static(path.join(__dirname,"assets/css")));
app.use(express.static('assets'));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("node_modules/bootstrap/dist/js"));
app.use(express.static("node_modules/jquery/dist"));

// use express router 
app.use('/',require('./routers'));

app.listen(port,(err)=>{
    if(err)
        console.log(`Error running the server: ${err}`);
    console.log(`Server is running on the port ${port}`);
});