const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike =async function(req,res){
    try {
    
        // Likes.toggle/id=abcdef&type=Post
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');// redo imp
        }else {
            likeable = await Comment.findById(req.query.id).populate('likes');// redo imp

        }

        // check if the like already exist
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        // if the like already exist then delete it 
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else {
            // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(like._id);
            likeable.save();

        }

        return res.json(200,{
            message:"Request successfuk",
            data: {
                deleted: deleted
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message : 'Internal Server Error'
        });
    }
}