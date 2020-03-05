const mongoose = require('mongoose')
const Comment = require('../models/comments.js')
const Schema =  mongoose.Schema
 const postSchema = new Schema ({
   title: String,
   image: String ,
   description: String,
   video: String,
   comment: [{user: String , comments: String}],
   likes:{ type:Number, default: 0}

 }, {
   timestamped: Date.now()
 })

const Post = mongoose.model('Post', postSchema)

module.exports = Post
