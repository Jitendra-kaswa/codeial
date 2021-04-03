const mongoose=require('mongoose'); // require the library 
mongoose.connect('mongodb://localhost/users'); // connect to the database 

const db=mongoose.connection; // aquire the connection to check if it is successfull

db.on('error',console.error.bind(console,'error connection to db')); // if it is an error than print error
db.once('open',()=>{
    console.log('Successfully connected to database');
});

module.exports=db;