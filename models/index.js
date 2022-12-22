const User = require('./User')
const BlogPost = require('./BlogPost')
const Comment = require('./Comment')

Comment.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
BlogPost.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
BlogPost.hasMany(Comment, {
	foreignKey: 'postId',
	onDelete: 'CASCADE',
})

module.exports = {
	Comment,
	User,
	BlogPost,
}
