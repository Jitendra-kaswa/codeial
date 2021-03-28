// require the library 
const mongoose=require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost/users');

// aquire the connection to check if it is successfull
const db=mongoose.connection;

// if it is an error than print error
db.on('error',console.error.bind(console,'error connection to db'));
db.once('open',()=>{
    console.log('Successfully connected to database');
});