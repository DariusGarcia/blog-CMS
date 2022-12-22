const router = require('express').Router()
const { User } = require('../../models/')

router.post('/register', async (req, res) => {
	try {
		const registerUser = await User.create(req.body)

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

module.exports = router
