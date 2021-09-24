// require passport
const passport = require('passport');
const User = require('../models/user')
// require localStragegt
const LocalStrategy = require('passport-local').Strategy;
// whenever local stratege is called the email and function is being called
// auth using passport
passport.use(new LocalStrategy({
    usernameField:'email' // email is comming from usse schema to identify the email
},
    function(email,password,done){ // doen is a callback function whic is calling back to passport functin 
        // find the user and estiblished identity
        // here in findOn 1st email is the property thst we are looking in the User and 2nd onr is conninf from funtion
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding the user usinf --->passport.js');
                return done(err);
            }
            // here user.password is from user from user and password is from function
            if(!user || user.password != password){
                console.log('invalid user name and password')
                return done(null,false); // this mean there is no error but the usr is not found basicall auth is not complete 1one null as there is no errroe and 2nd one is false as authentication is not being dome
            }
            return done(null,user);

        });
    }

));


// seralize the user todecide which key is to kept in the cookie
passport.serializeUser(function(user,done){
     done(null,user.id);
});


// de-seralizing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user usinf --->passport.js');
            return done(err);
        }
            return done(null,user);
    });
});

// check if the user is authenciaed
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in the pass request to the next function i.e controllers actions
    if(req.isAuthenticated()){
        return next(); // then the user can view the page
    }

    // if the user is not signed in
    return res.redirect('/user/sign-in')
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.usr containg the current signed  in user from the session cookie and we jus  sending it to local form the views
        res.locals.user = req.user
    }
    next();
}
module.exports = passport;