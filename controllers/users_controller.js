const User = require('../models/user')

// calling post
//const Post = require('../models/post')
module.exports.profile = function(req,res){
   // return res.end('<h1>@ profile page</h1>')
   User.findById(req.params.id,function(err,user){

    return res.render('userhome',{
        title:'user profile',
        profile_user:user
       })
   });
    
}

module.exports.userPost = function(req,res){
    return res.end('<h1> post page</h1>')
}
// creating sign up
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render('user_signup',{
        title:'codeial | signup '
    })
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){ // {we can also replace req.body with "{name:req.body.name,email:req.body.email}"}
            return res.redirect('back')
        });
    }else{
        return res.status(401).send('unauthorized');
    }
    }


//creating sign in
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/user/profile')
    }
    return res.render('user_signin',{
        title:'codeial | signin'
    })
}

// here we are handling signup request comming from form
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log('password doesnot match')
        return res.redirect('back')
    }
    // checking wheather email is present  or not
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');return;
        }
        // if user is not found then we have to do:
        if(!user){
            User.create(req.body,function(err,user){ // we are usimg User not user 'user' is data comming from db 
         if(err){console.log('error in creting user in signing up');return;}       
            return res.redirect('/user/sign-in')
            })
        }else{
             return res.redirect('back')
        }
    })
}
// here we are creating session i.e handling signin page for the user
module.exports.createSession = function(req,res){
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout() // logout is given to req by passport.js
    
    return res.redirect('/')
}

// creating makePost by me
// module.exports.makePost  = function(req,res){
//     console.log(req.body)
//     Post.create(req.body,function(err,user){
//         if(err){
//             console.log('hey it an error')
//             return;
//         }
//         return res.redirect('/')
//     })
// }