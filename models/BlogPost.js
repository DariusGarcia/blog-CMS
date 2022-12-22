const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// Blog Post model
class BlogPost extends Model {}

BlogPost.init(
	{
		title: { type: DataTypes.STRING, allowNull: false },
		blogText: { type: DataTypes.STRING, allowNull: false },
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'BlogPost',
	}
)

module.exports = BlogPost
