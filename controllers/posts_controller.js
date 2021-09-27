const Post = require('../models/post');
module.exports.create = function(req,res){
   // console.log(req.user); // need to understand properly
    Post.create({
        content:req.body.content,
        user:req.user._id // this user is omming from app.use(passport.setAuthenticatedUser)
    },function(err,post){
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('/')
    })
}