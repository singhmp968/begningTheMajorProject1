// reffered from sir' solution the home_post.js can also be done like this
class PostComment {
    constructor(postId){
    this.postId = postId;
    this.createComment(postId)
    // this.postContainer = $(`#post-${postId}`);
    // this.newCommentForm = $(`#post-${postId}-comments-form`);
    let self = this;
    // gettig all the existing comments
    $(' .delete-comment-button',this.postContainer).each(function(){
        self.deleteComment($(this));
    })
    }
    createComment(postId){
        console.log('ppppoo=>',postId);
    }
}

// {   // method to create post
//     let createComment = function() {
//         let commentForm = $(`post-${post._id}-comments-form`);
//         commentForm.submit(function(e){
//             console.log('@clciedd');
//             e.preventDefault();
//         })
//     }
//     // method to display post

// createComment();
// }