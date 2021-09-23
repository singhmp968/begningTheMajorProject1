const User = require('../models/user')

module.exports.profile = function(req,res){
  //**** */ we are getting cookie from request but we have to manipulate it with res*****
  if(req.cookies.user_id){
      User.findById(req.cookies.user_id,function(err,user){
          if(user){
              return res.render('userhome',{
                title:'user profile',
                user:user
            })

          }
          return res.redirect('/user/sign-in') 
      })
  }else{
      return res.redirect('/user/sign-in')
  }
  
  
   // return res.end('<h1>@ profile page</h1>')
    // return res.render('userhome',{
    //     title:'user profile'
    // })

}

module.exports.userPost = function(req,res){
    return res.end('<h1> post page</h1>')
}
// creating sign up
module.exports.signUp = function(req,res){
    return res.render('user_signup',{
        title:'codeial | signup '
    })
    
}

//creating sign in
module.exports.signin = function(req,res){
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
    // steps to auth
    //find the user
    User.findOne({email:req.body.email},function(err,user){
         if(err){console.log('error in creting user in signing in');return;}       
         // handle user found
         if(user){
            // handle password which doesnot match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id',user.id)
            return res.redirect('/user/profile')

         }else{
                // handle user not found
                return res.redirect('back'); 
         }
    })
    
   

}

// signout login
module.exports.signout = function(req,res){
     console.log(req.cookies.user_id)
    res.clearCookie("user_id");
    res.redirect('/user/sign-in');
   
}