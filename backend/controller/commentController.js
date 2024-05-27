const Comment = require('../models/Comment')
const Post = require('../models/Post')

const commentController = {
    index : async(req,res) =>{
        try {
            let postId = req.params.id
            let comment = await Comment.find({postId})
            return res.json(comment)
        } catch (e) {
            return res.status(500).json({msg:'server error'})
        }
    },

    create : async(req,res) =>{    
        try {
            let {text} = req.body
            let postId = req.params.id

            //create comment
            let comment = await Comment.create({postId,text})

            //add comment in post
            let post = await Post.findById(postId)
            post.comment.push(comment)
            await post.save()

            return res.status(200).json(comment)
        } catch (error) {
            
        }
    },
    
}

module.exports = commentController