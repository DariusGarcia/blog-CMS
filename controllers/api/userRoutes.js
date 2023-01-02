const userRouter = require('express').Router()
const { User } = require('../../models/')

userRouter.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (!userData) {
      res.status(400).json({ message: 'No user account found!' })
      return
    }

    const validPassword = userData.comparePassword(req.body.password)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'No user account found! Please try again.' })
      return
    }

    req.session.save(() => {
      req.session.userId = userData.id
      req.session.username = userData.username
      req.session.loggedIn = true

      res.json({ userData, message: 'You are now logged in!' })
    })
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' })
  }
})

// POST/create a new user
userRouter.post('/register', async (req, res) => {
  try {
    const registerUser = await User.create(req.body)
    // saving user data to session storage in DB
    req.session.save(() => {
      req.session.userId = registerUser.id
      req.session.username = registerUser.username
      req.session.loggedIn = true

      res.json({
        registerUser,
        message: `${registerUser.username} successfully created an account!`,
      })
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

userRouter.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = userRouter
