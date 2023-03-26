const { getUserProfile, getAllInvites } = require('./get');
const { createUser, loginUser, userUpdate, applyJob } = require('./post');
const { createUserBody, createCompanyBody, createJobBody, userAuthErrorResponse } = require('./schemas');

module.exports = {
	users: { createUser, loginUser, userAuthErrorResponse, createUserBody, getUserProfile, userUpdate, applyJob, getAllInvites, createCompanyBody, createJobBody }
}