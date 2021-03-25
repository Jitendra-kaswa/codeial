const express=require('express');
const port=9838;
const app=express();
app.get('/',(req,res)=>{
    return res.send('Hello');
})
app.listen(port,(err)=>{
    if(err)
        console.log(`Error running the server: ${err}`);
    console.log(`Server is running on the port ${port}`);
});