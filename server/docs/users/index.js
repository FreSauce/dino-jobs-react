const { getUserProfile, getAllInvites} = require('./get');
const { createUser, loginUser, userUpdate, applyJob } = require('./post');
const { createUserBody, createCompanyBody, createJobBody } = require('./schemas');

module.exports = {
	users: { createUser, loginUser, createUserBody, getUserProfile, userUpdate, applyJob, getAllInvites, createCompanyBody, createJobBody  }
}