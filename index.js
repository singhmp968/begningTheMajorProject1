const express  = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); // here  connect mongo reuired and aurgument 'session'
//const MongoStore = require('connect-mongo').default

//const { use } = require('./routes');

const sassmiddleWare = require('node-sass-middleware');
app.use(sassmiddleWare({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true, // this will be set ture if we need to display error if we find any issue while converting scss file to css
    outputStyle:'extended',
    prefix:'/css' // this for node server to find scss file i.e for layoyt 
}))

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


// setting up view engine for our app
app.set('view engine','ejs');
app.set('views','./views')
// Mongostore is used to store the session cookie in the db
// we need to follow order
app.use(session({
    name:'codeial',
    //TODO:change before deployment in production mode
    secret:'something',
    saveUninitialized:false,  // whenever there is a request which is nt initilize i.e a session which is not initilize that also mean that the user has not logged in so in that case we don't need to store extra data in session cookie
    resave:false, // in resave if the identity is estiblished or some sort o data is present i.e session data do we need to re-write it? no we dont need to save again
    cookie:{ // giving time limit after which our coookie will get expire
        maxAge:(1000*60*100)
    },
    // Mongostore is used to store the session cookie in the db
    store: new MongoStore(
        {
        
            mongooseConnection: db, // connecting to DB
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
        )

    // store: MongoStore.create(
    //     {
        
    //         mongooseConnection: 'mongodb://localhost/codeial_dev', // connecting to DB
    //         autoRemove:'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok')
    //     }
    // )
   
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use('/',require('./routes')) // any request is comming required the index of route

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port ${port}`);
})