const { model, Schema } = require('mongoose');

const Invites = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	job: {
		type: Schema.Types.ObjectId,
		ref: 'Job'
	},
	link: {
		type: String,
		required: true,
		index: true
	}
})

module.exports = model('invites', Invites);