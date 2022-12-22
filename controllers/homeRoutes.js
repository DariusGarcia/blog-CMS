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

module.exports = router
