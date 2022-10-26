const { connect } = require('mongoose');


connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Database connected');
});

module.exports = {
	User: require('./User'),
	Job: require('./Job'),
	Company: require('./Company'),
	// Message: require('./MessageModel'),
}	