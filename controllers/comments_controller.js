const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');
module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){ //  here we are first checking wheather post exist in database or not
        if(post){ // if we find the post

            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user:req.user._id
                
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

// logic for destroying ommnets
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post; // storing comment id of comment.post before deleting andwe are going to use this into deleting the comment id @ postSchema
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull: { comments: req.params.id }},function(err,post){ // here { $pull: { comments: req.params.id } is used to pull the comments from DB
                return res.redirect('back');
            }); 
        }else{
                return res.redirect('back');        
        }
    })  
}