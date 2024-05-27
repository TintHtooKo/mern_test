const mongoose = require('mongoose');
const Post= require('../models/Post')
const fs = require('fs').promises;

const postController = {
    index : async(req,res)=>{
        try {
            let post = await Post.find().sort({createdAt : -1}).populate('comment')
            return res.json(post)
        } catch (error) {
            console.log(error.message);
            return res.status(500)
        }
    },

    create : async(req,res)=>{
        try {
            const {title,body} = req.body
            let post = await Post.create({
                title,
                body,           
            })
            // console.log(post);
            return res.json(post)
        } catch (error) {
            console.log(error.message);
        }
    },

    detail : async(req,res)=>{
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"not valid id"})
            }
            let post = await Post.findById(id).populate('comment')
            if(!post){
                return res.status(400).json({msg:'post not found'})
            }
            return res.json(post)
        } catch (error) {
            return res.status(500).json({msg:'server error'})
        }
    },

    update : async(req,res)=>{
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"not valid id"})
            }
            let post = await Post.findByIdAndUpdate(id,{
                ...req.body
            })

            let fileExist;
            let path = __dirname+'/../public'+post.photo
            try {
                await fs.access(path)
                fileExist = true;
            } catch (e) {
                fileExist = false;
            }

            if(fileExist){
                fs.unlink(path)
            }

            if(!post){
                return res.status(400).json({msg:'post not found'})
            }
            return res.json(post)
        } catch (error) {
            return res.status(500).json({msg:'server error'})
        }
    },

    delete : async(req,res)=>{
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"not valid id"})
            }
            let post = await Post.findByIdAndDelete(id)

            let fileExist;
            let path = __dirname+'/../public'+post.photo
            try {
                await fs.access(path)
                fileExist = true;
            } catch (e) {
                fileExist = false;
            }

            if(fileExist){
                fs.unlink(path)
            }
            if(!post){
                return res.status(400).json({msg:'post not found'})
            }
            return res.json({msg:"delete success"})
        } catch (error) {
            return res.status(500).json({msg:'server error'})
        }
    },

    upload : async(req,res) =>{
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"not valid id"})
            }
            let post = await Post.findByIdAndUpdate(id,{
                photo : '/'+req.file.filename
            })
            if(!post){
                return res.status(400).json({msg:'post not found'})
            }
            return res.json(post)
        } catch (error) {
            return res.status(500).json({msg:'server error'})
        }
    }
}

module.exports = postController;