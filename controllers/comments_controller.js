const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');
module.exports.create =async function(req,res){  
    try {
        let post=await Post.findById(req.body.post) //  here we are first checking wheather post exist in database or not); 
        console.log('ppppp->',post);
        if(post){ // if we find the post
          let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user:req.user._id            
            });      
            // now here we are updatin 'post' i.e addind data to %%post%%
            post.comments.push(comment) // pushing comment into comments into the &&same post&& 
            post.save(); // after every update it will going to save the data in DB
            // TODO : TA Help reuired 
            //req.flash('success','comment added success fully');
            if(req.xhr){
                // fetching all the user id for proceding further
                //comment = await comment.populate('user', 'name').execPopulate();
                let userDet =await Comment.findOne({user:req.user._id}).populate('user').exec(); // populating username from post
                //console.log('possst12345=>',userDet.user.name);
                return res.status(200).json({
                    data: {
                        comment: comment,
                        userDetails : userDet.user.name
                    },
                    message: "comment created !"
                });
            }

            res.redirect('/');
           
        }     
    } catch (error) {
        console.log('Error', error);
        return;     
    }
   
}

// logic for destroying ommnets
module.exports.destroy =async function(req,res){
try {
    let comment=await Comment.findById(req.params.id)
   if(comment.user == req.user.id){
    let postId = comment.post; // storing comment id of comment.post before deleting andwe are going to use this into deleting the comment id @ postSchema
    comment.remove();
    Post.findByIdAndUpdate(postId,{ $pull: { comments: req.params.id }},function(err,post){ // here { $pull: { comments: req.params.id } is used to pull the comments from DB
        
         // send the comment id which was deleted back to the views
         if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
        
        // TODO: req.flash
          req.flash('success','comment destroy success fully');
        return res.redirect('back');
    }); 
    }else{
        req.flash('error', 'Unauthorized');
    return res.redirect('back');        
}  
} catch (error) {
    req.flash('error', error);
    console.log('Error', error);
    return;
}
   
}