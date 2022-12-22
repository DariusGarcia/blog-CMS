const commentRouter = require('express').Router()
const { Comment } = require('../../models/')
const withAuth = require('../../utils/userAuthHelper')

// fetch ALL comments
commentRouter.get('/', withAuth, async (req, res) => {
	try {
		const createComment = await Comment.findAll()
		res.json(createComment)
	} catch (err) {
		res.status(500).json(err)
	}
})
// POST/create a new user comment
commentRouter.post('/', withAuth, async (req, res) => {
	try {
		const commentData = req.body
		const createComment = await Comment.create({
			...commentData,
			userId: req.session.userId,
		})
		res.json(createComment)
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = commentRouter
