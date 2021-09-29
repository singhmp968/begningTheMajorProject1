const Post = require("../models/post")
const User = require('../models/user')
module.exports.home = function(req, res){
   // return res.end('<h1>Express is up for Codeial!</h1>')
   //console.log(req.cookies) //  displayng cookies values
   //res.cookie('userId',2560)
    
//    Post.find({},function(err,posts){ // {} this will return all the post
//        if(err){console.log('err'); return}
//         //console.log('postss->',post)
//         return res.render('home',{
//         title:"odeial | Home",
//         posts:posts
//         //users:users
//         })
//     })

// here in the below function we are populating the user from User DB by using populate there is some slight change in the function writing i.e populate('user').exec() 
Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate: {
        path : 'user'
}
})
.exec(function(err,posts){ // {} this will return all the post
           if(err){console.log('err'); return}
            //console.log('postss->',post)
            return res.render('home',{
            title:"odeial | Home",
            posts:posts
            //users:users
            })


        })
    }
//    return res.render('home',{
//         title:"Home"
//     })


module.exports.action = function(req,res){
    return res.end('<h1>welcomr to Action page</h1>')
}
module.exports.aboutUs = function(req,res){
    return res.end('<h1>hi man</h1>')
}