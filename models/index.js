const User = require('./User')
const BlogPost = require('./BlogPost')

BlogPost.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})

module.exports = {
	User,
	BlogPost,
}
