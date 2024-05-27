const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required :true
    },
    photo : {
        type : String,
        required : false
    },
    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
},{timestamps : true})

module.exports = mongoose.model('Post',PostSchema)