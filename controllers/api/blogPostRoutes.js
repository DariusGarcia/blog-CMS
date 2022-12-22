const blogPostRouter = require('express').Router()
const { BlogPost } = require('../../models/')
const withAuth = require('../../utils/userAuthHelper')

// fetch ALL blog posts
blogPostRouter.get('/', async (req, res) => {
	try {
		const allPosts = await BlogPost.findAll()
		res.json(allPosts)
	} catch (err) {
		res.status(500).json(err)
	}
})
// POST/create a new blog post
blogPostRouter.post('/', async (req, res) => {
	try {
		const postData = req.body
		const newPost = await BlogPost.create({
			...postData,
			userId: req.session.userId,
		})

		res.json(newPost)
	} catch (err) {
		res.status(500).json(err)
	}
})
// UPDATE a single existing blog post
blogPostRouter.put('/:id', async (req, res) => {
	try {
		const postData = req.body
		const [makeChanges] = await BlogPost.update(postData, {
			where: {
				id: req.params.id,
			},
		})

		if (makeChanges > 0) {
			res.status(200).end()
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = blogPostRouter
