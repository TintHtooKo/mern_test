const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        require : true
    },
    text : {
        type : String,
    }
},{timestamps:true})

module.exports = mongoose.model("Comment",commentSchema)