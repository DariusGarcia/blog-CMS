const router = require('express').Router()

const apiRoutes = require('./api')
const dashboardRouter = require('./blogDashboardRoutes')
const homeRoutes = require('./homeRoutes.js')

router.use('/', homeRoutes)
router.use('/dashboard', dashboardRouter)
router.use('/api', apiRoutes)

module.exports = router
