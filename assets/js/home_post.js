{
   // method to send data on Db using ajax to prevent refresh 
    let createPost = function() {
        let newPostForm = $('#new-post-form'); // gettint from from home.ejs
        newPostForm.submit(function(e){
            console.log('clicked @ hrere')
            e.preventDefault(); // here we are preventing defailts action of submit so with the help of ajax we can proceed further

            $.ajax({ // making Ajax request using jquery to senda tata commin =g from form to DB
                type:'POST',
                url: 'posts/create',
                data : newPostForm.serialize(), // this will convert data comming from form to JSON Format i.e content : 'valeu of the post content';
                success : function(data){
                    console.log(data)
                }, error:function(error){
                    console.log(error.responseText);
                }
            })
        });
        
    }
    createPost();

    // method to create a post in Dom
}