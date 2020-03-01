const express = require('express')
const Post = require('../models/post.js')
const posts = express.Router()


/* Display*/


// Index

posts.get('/', (req, res) => {

  Post.find({}, (err, allPosts) => {
    res.render('index.ejs', {
      posts: allPosts,
      tabTitle: 'All Guides'
    })
  })
})



// new
posts.get('/new',  (req, res) => {
   res.render('new.ejs')
})


// Show
posts.get('/:title', (req, res) => {
  Post.findOne({title:req.params.title}, (err, foundPost) => {
    res.render('show.ejs',
  {
    post: foundPost
  })
  })
})



// Edit

posts.get('/:title/edit', (req, res) => {
Post.findOne({title: req.params.title}, (err, foundPost) => {
  res.render('edit.ejs', {
    post: foundPost
  })
})
})


// Create

posts.post('/', (req, res) => {

  Post.create(req.body, (err, allPosts) => {
    res.redirect('/travelguide')
  })
})


// Upgrade

posts.put('/:title', (req, res) => {
  Post.findOneAndUpdate({title: req.params.title}, req.body, (err, updatedPost) => {
    res.redirect(`/travelguide/${req.params.title}`)
  })

})




// Delete

posts.delete('/:title', (req, res) => {
  Post.findOneAndRemove({title: req.params.title}, req.body , (err, deletedPost) => {
    res.redirect('/travelguide')
  })
})


//
module.exports = posts
