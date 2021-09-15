const express  = require('express');
const app = express();
const port = 8000;

// uses express route
app.use('/',require('./routes')) // any request is comming required the index of route



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port ${port}`);
})