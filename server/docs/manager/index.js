const { createManager, getApplicantProfile, managerProfile, inviteApplicant } = require('./post');
const { createManagerBody } = require('./schemas');

module.exports = {
	manager: { getApplicantProfile,  managerProfile, inviteApplicant, createManager, createManagerBody }
}