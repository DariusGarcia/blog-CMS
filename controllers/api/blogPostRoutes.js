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
blogPostRouter.post('/', hasAuth, async (req, res) => {
	const body = req.body

	try {
		const newPost = await BlogPost.create({
			...body,
			userId: req.session.userId,
		})
		res.json(newPost)
	} catch (err) {
		res.status(500).json(err)
	}
})
// UPDATE a single existing blog post
blogPostRouter.put('/:id', hasAuth, async (req, res) => {
	try {
		const [makeChanges] = await BlogPost.update(req.body, {
			where: {
				id: req.params.id,
			},
		})

		if (makeChanges > 0) {
			res.status(200).end()
		} else {
			res.status(404).end()
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = blogPostRouter
