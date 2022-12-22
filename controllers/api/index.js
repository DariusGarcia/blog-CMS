const router = require('express').Router()
const userRoutes = require('./userRoutes.js')
const blogPostRoutes = require('./blogPostRoutes')

router.use('/user', userRoutes)
router.use('/post', blogPostRoutes)

module.exports = router
