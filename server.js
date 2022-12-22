require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const expressHandlebars = require('express-handlebars')
const routes = require('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection.js')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

// pass in util helper functions into handlebars
const hbs = expressHandlebars.create({ helpers })

const sess = {
	secret: '74vLqUS50mP4FNlPzfqd42IBnoL34823',
	cookie: {
		maxAge: 300000,
		httpOnly: true,
		secure: false,
		sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
}

app.use(session(sess))

// set the express engine to Handlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on ${PORT}!`))
})
