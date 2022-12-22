const userRouter = require('express').Router()
const { User } = require('../../models/')

// POST/create a new user
userRouter.post('/register', async (req, res) => {
	try {
		const registerUser = await User.create(req.body)
		// saving user data to session storage in DB
		req.session.save(() => {
			req.session.userId = registerUser.id
			req.session.username = registerUser.username
			req.session.loggedIn = true

			res.json(registerUser)
		})
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = userRouter
