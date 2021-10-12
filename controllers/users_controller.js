const { use } = require('passport');
const User = require('../models/user')
const fs = require('fs');
const path = require('path');
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

module.exports.update =async function(req,res){
    /*if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){ // {we can also replace req.body with "{name:req.body.name,email:req.body.email}"}
            return res.redirect('back')
        });
    }else{
        return res.status(401).send('unauthorized');
    }*/
    // converting to async and await
    if(req.user.id == req.params.id){
        try {
            // when we are trying to access the body param i.e values omming from the there due to 'multipart/form-data ' and we wont be able to access directly from req.params due to multipart form and there for this we hava multer 1.userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar') and 2.userSchema.statics.avatarPath = AVATAR_PATH we are going to take help
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('Multer error',err); return;}
                //console.log(req.file); // req contain the files
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){ // deleting or replacing a user image
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar)); // userSchema.statics.avatarPath = AVATAR_PATH go to user file in model
                    }
                    // this is just saving the path only of the uploaded file intothe avatar fields in the user
                    user.avatar = User.avatarPath +'/'+ req.file.filename //taking from userSchema.statics.avatarPath = AVATAR_PATH
                }
                user.save();
                return res.redirect('back');
            })
        } catch (error) {
            req.flash('error',error);
            console.log('Error',error) ;
            return res.redirect('back');
        }

    }else{
        //TODO flash message for unauthorized
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
    req.flash('success','Logged in successfully'); // for passing this to the html or ejs we need to create a middle-ware that fetch every thing from req.flash
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout() // logout is given to req by passport.js
    req.flash('success','logged out'); // for passing this to the html or ejs we need to create a middle-ware that fetch every thing from req.flash
    
   // return res.redirect('/',{flash:{success:'logged'}}) we are not using it beacause every time we have to create a seperate cntext to send the message
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