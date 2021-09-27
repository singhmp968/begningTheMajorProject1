const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');
module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){ //  here we are first checking wheather post exist in database or not
        if(post){ // if we find the post

            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user:req.user_id
                
            },function(err,comment){
                    // handle error
                    if(err){console.log('error');return}

                    // now here we are updatin 'post' i.e addind data to %%post%%
                    post.comments.push(comment) // pushing comment into comments into the &&same post&& 
                    post.save(); // after every update it will going to save the data in DB
                    res.redirect('/')
            });
        }
    }); 
    
    
}