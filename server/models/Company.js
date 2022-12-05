const { model, Schema } = require('mongoose');

const CompanyModel = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	logo: {
		type: String,
	},
	website: {
		type: String,
	},
	employees: Number,
});

module.exports = model('Company', CompanyModel);