const express  = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose') 
const { use } = require('./routes');
const cookieParser = require('cookie-parser'); // cookie parser
app.use(express.urlencoded());
app.use(cookieParser()) //setting up the cookie parser
// we need to implement out layout befor our routes beacause in routes views is going to be render
app.use(expressLayout);
// uses express route
app.use(express.static('./assets'))

// extract style and scrit from the sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)


app.use('/',require('./routes')) // any request is comming required the index of route
// setting up view engine for our app
app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port ${port}`);
})