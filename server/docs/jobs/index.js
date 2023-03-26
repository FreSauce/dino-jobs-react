const { getJobs } = require('./get');
const { createJob } = require('./post');
const { createJobBody } = require('./schemas');

module.exports = {
	jobs: { getJobs, createJob, createJobBody }
}