const router = require('express').Router()

const { User, BlogPost } = require('../models/index')

// fetching ALL blog posts to display in the home layout
router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [User],
    })
    const serializedPosts = blogPostData.map((data) =>
      data.get({ plain: true })
    )
    res.render('displayAllPosts', { serializedPosts })
  } catch (err) {
    res.status(500).json(err)
  }
})

// get single blog post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    })

    if (postData) {
      const post = postData.get({ plain: true })

      res.render('single-post', { post })
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('register')
})

module.exports = router
