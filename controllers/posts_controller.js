const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create =async function(req,res){
   // console.log(req.user); // need to understand properly
   try {
    await  Post.create({
        content:req.body.content,
        user:req.user._id // this user is omming from app.use(passport.setAuthenticatedUser)
    })
    return res.redirect('back')
       
   } catch (error) {
    console.log('Error',err) ;
    return;
   }
    
}

module.exports.destroy =async function(req,res){
    try {
        let post=await Post.findById(req.params.id) // getting the id from from paran not by using query
        // putting check for authorizaion i.e am i allow to delete that post i.e if the user has make that post then only he can delete that post not onter then that user that has make that post
        //.id means converting the objet id into string
        if(post.user == req.user.id){ //we are getting user id from post schema kindly check 2.we re not using this req.user._id bacause it is not in string thereofore we hava to use req.user.id
            post.remove(); // removing the post
           await Comment.deleteMany({post: req.params.id}) // deleting all the comments by  id) 
            
           return res.redirect('back')

        
        }else { // if post and id donot match
            return res.redirect('back')
        }    
    } catch (error) {
        console.log('Error',error)
    }

    
    
}
