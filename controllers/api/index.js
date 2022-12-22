const apiRouter = require('express').Router()
const userRoutes = require('./userRoutes.js')
const blogPostRoutes = require('./blogPostRoutes')
const commentRoutes = require('./commentRoutes')

apiRouter.use('/user', userRoutes)
apiRouter.use('/post', blogPostRoutes)
apiRouter.use('/comment', commentRoutes)

module.exports = apiRouter
