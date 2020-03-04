const express = require('express')
const Post = require('../models/post.js')
const posts = express.Router()


/* Display*/


// Index

posts.get('/', (req, res) => {

  Post.find({}, (err, allPosts) => {
    res.render('index.ejs', {
      posts: allPosts,
      currentUser: req.session.currentUser,
      tabTitle: 'All Guides'
    })
  })
})

posts.get('/search/:text', (req, res) => {

  Post.find({$text: {$search:`${req.params.text}`}}, (err, allPosts) => {
    // res.send(allPosts);
    res.render('search.ejs', {
      posts: allPosts,
      currentUser: req.session.currentUser,
      tabTitle: 'All Guides'
    })
  })
})

// new
posts.get('/new',  (req, res) => {
   res.render('new.ejs', {
     currentUser: req.session.currentUser
   })
})


// Show
posts.get('/:title', (req, res) => {
  Post.findOne({title:req.params.title}, (err, foundPost) => {
    res.render('show.ejs',
  {
    post: foundPost,
    currentUser: req.session.currentUser
  })
  })
})



// Edit

posts.get('/:title/edit', (req, res) => {
Post.findOne({title: req.params.title}, (err, foundPost) => {
  res.render('edit.ejs', {
    post: foundPost,
  currentUser: req.session.currentUser
  })
})
})


//
posts.get('/setup/seed', (req, res) => {

Post.create([{
  title:'Vietnam Day 1',
  image: 'https://www.visa-vietnam.org/media/k2/items/cache/cb814f6646368a9340b7ed30aa1a9ed7_XL.jpg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},{
  title:'Vietnam Day 2',
  image: 'https://charmingtraveldestinations.com/wp-content/uploads/2017/05/Golden-Bridge-Banan-Hill-DaNang-Vietnam.jpg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},{
  title:'Turkey Day 1',
  image: 'https://www.onlinevisatravel.com/wp-content/uploads/2017/10/Turkey-Istanbul_8274724020.jpg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},{
  title:'Turkey Day 2',
  image: 'https://msbeta.chase.com/content/dam/jpm/merchant-services/country-reports/turkey/JP_Morgan_Turkey-Headers-1.jpg',
  description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},

])

})



//



/*Funtional Routes*/






// Create



posts.post('/', (req, res) => {

  Post.create(req.body, (err, allPosts) => {
    res.redirect('/travelguide')
  })
})


// search
posts.post('/search', (req, res) => {

  // Post.create(req.body, (err, allPosts) => {
    res.resend(`${req.body}`)
  // })
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
