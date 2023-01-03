const dashboardRouter = require('express').Router()
const { BlogPost } = require('../models/')
const isAuthenticated = require('../utils/auth')

dashboardRouter.get('/', isAuthenticated, async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      where: {
        userId: req.session.userId,
      },
    })

    const blogPosts = postData.map((post) => post.get({ plain: true }))

    res.render('displayAllPostsAdmin', {
      layout: 'dashboard',
      blogPosts,
    })
  } catch (err) {
    res.redirect('login')
  }
})

// show new post page
dashboardRouter.get('/new', isAuthenticated, (req, res) => {
  res.render('newPost', {
    layout: 'dashboard',
  })
})
// edit a post page
dashboardRouter.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id)

    if (postData) {
      const blogPost = postData.get({ plain: true })

      res.render('edit-post', {
        layout: 'dashboard',
        blogPost,
      })
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.redirect('login')
  }
})

module.exports = dashboardRouter
