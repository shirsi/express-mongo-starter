const express = require('express')
const Post = require('../models/post.js')
const posts = express.Router()


const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

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

Post.find({continent: req.params.text}, (err, allPosts) => {
    if (err) {
      res.send(err)
    }
    // res.send(allPosts);
    console.log(allPosts);
    res.render('search.ejs', {
      posts: allPosts,
      currentUser: req.session.currentUser,
      tabTitle: `${req.params.text}`
    })
  })
})

// new
posts.get('/new', isAuthenticated, (req, res) => {
  res.render('new.ejs', {
    currentUser: req.session.currentUser,
    tabTitle: "New Blog"
  })
})


// Show
posts.get('/:title', (req, res) => {
  Post.findOne({
    title: req.params.title
  }, (err, foundPost) => {
    res.render('show.ejs', {
      post: foundPost,
      currentUser: req.session.currentUser,
      tabTitle: `${req.params.title}`
    })
  })
})



// Edit

posts.get('/:title/edit', isAuthenticated, (req, res) => {
  Post.findOne({
    title: req.params.title
  }, (err, foundPost) => {
    res.render('edit.ejs', {
      post: foundPost,
      currentUser: req.session.currentUser,
      tabTitle: `${req.params.title}`
    })
  })
})


//
posts.get('/setup/seed', (req, res) => {

  Post.create([{
      title: 'Vietnam Day 1',
      image: 'https://www.visa-vietnam.org/media/k2/items/cache/cb814f6646368a9340b7ed30aa1a9ed7_XL.jpg',
      continent:'Asia' ,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Asia Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      video: "https://www.youtube.com/embed/VR8i-Wf2w-I",

    }, {
      title: 'Vietnam Day 2',
      continent:'Asia',
      image: 'https://charmingtraveldestinations.com/wp-content/uploads/2017/05/Golden-Bridge-Banan-Hill-DaNang-Vietnam.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse Asia cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      video: "https://www.youtube.com/embed/8fOS0rIrmhE",
    }, {
      title: 'Turkey Day 1',
      continent:'Asia',
      image: 'https://www.onlinevisatravel.com/wp-content/uploads/2017/10/Turkey-Istanbul_8274724020.jpg',
      video: "https://www.youtube.com/embed/VgoHMrFjQN0",
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis Asia aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
      title: 'Kenya',
      continent:'Africa',
      image: 'https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/zebra-africa-1512710348-785X440.jpg',
      video: "https://www.youtube.com/embed/H0XCI7D46Hk",
      description: 'Africa Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
      title: 'Greece',
      continent:'Europe',
      image: 'https://www.state.gov/wp-content/uploads/2018/11/Greece-2560x1194.jpg',
      video: "https://www.youtube.com/embed/PVjasi1vKk0",
      description: 'Europe Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
      title: 'Brazil',
      continent:'South America',
      image: 'https://cdn.images.express.co.uk/img/dynamic/133/590x/christ-1125780.jpg?r=1557574031254',
      video: "https://www.youtube.com/embed/jqJ1Ll0g8k4",
      description: 'South America Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
      title: 'Mexico',
      continent:'North America',
      image: 'https://www.nationalgeographic.com/content/dam/travel/commercial/2019/domestic/intercontinental/mexico-city/mexico-city-palacio-bellas-artes.adapt.1900.1.jpg',
      video: "https://www.youtube.com/embed/6WkhkoDR_qc",
      description: 'North America Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
      title: 'Australia',
      continent:'Australia',
      image: 'https://static1.squarespace.com/static/55ee34aae4b0bf70212ada4c/57d9829837c5819632bc630b/5e06e89e74877f00dbb21494/1577545446402/keith-zhu-qaNcz43MeY8-unsplash+%281%29.jpg?format=1500w',
      video: "https://www.youtube.com/embed/OLMdkYkoYfk",
      description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

  ]), (err, foundPost) => {
    res.redirect('/travelguide')

  }
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
  Post.findOneAndUpdate({
    title: req.params.title
  }, req.body, (err, updatedPost) => {
    res.redirect(`/travelguide/${req.body.title}`)
  })

})

// Comments

posts.post('/:title', isAuthenticated, (req, res) => {

  Post.findOneAndUpdate({
    title: req.params.title
  }, {
    $push: {
      comment: {
        comments: req.body.comment,
        user: req.body.user
      }
    }
  }, (err, updatedPost) => {
    console.log(err);
    res.redirect(`/travelguide/${req.params.title}`)
  })

})
posts.put('/:title/update', isAuthenticated, (req, res) => {
  // console.log(req.params);

  Post.findOneAndUpdate({
    title: req.params.title
  }, {
    $inc: {
      likes: 1
    }
  }, (err, updatedItem) => {
    console.log(err);
    res.redirect(`/travelguide/${req.params.title}`)
  })
})

// Delete
// posts.delete('/:title/:comment',isAuthenticated, (req, res) => {
//   console.log(req.params.comment);
//   Post.findOneAndRemove({title: req.params.title},
//    {$pull:{comment:req.params.comment}}, (err, updatedPost) => {
// console.log(err);
//     res.redirect(`/travelguide/${req.params.title}`)
//   })
//
// })


posts.delete('/:title', (req, res) => {
  Post.findOneAndRemove({
    title: req.params.title
  }, req.body, (err, deletedPost) => {
    res.redirect('/travelguide')
  })
})


//
module.exports = posts
