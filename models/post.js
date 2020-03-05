const mongoose = require('mongoose')
const Comment = require('../models/comments.js')
const Schema =  mongoose.Schema
 const postSchema = new Schema ({
   title: String,
   image: String ,
   description: String,
   comment: [String],
   // {comments:Array, likes: Number},
   likes: Number

 }, {
   timestamped: Date.now()
 })

const Post = mongoose.model('Post', postSchema)

module.exports = Post
