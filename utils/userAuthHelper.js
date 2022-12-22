// checks the session if the user is logged in and the user's id is provided
function ifAuthentic(req, res, next) {
	if (!req.session.userId) {
		res.redirect('/login')
	} else {
		next()
	}
}

module.exports = ifAuthentic
