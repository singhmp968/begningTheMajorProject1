const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({

    user : {
        type: mongoose.Schema.ObjectId
    },
    // this define the object i of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required:true,
        // for making dynamic reference
        refPath : 'onModel'
    },
    // this field is used for defining the type of the type of the liked object sinc this is a dynamic reference 
    onModel: {
        type:String,
        required:true,
        enum: ['Post','Comment']
    }
    // enum: ['Post','Comment' ] it tells that value of like can be only post or comment model nothing other than that


},{
    timestamps: true
});


const Like = mongoose.model('Like',likeSchema);
module.exports = Like;