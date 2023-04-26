const { users } = require('./users')
const { jobs } = require('./jobs')
const { manager } = require('./manager')
const { userAuthErrorResponse } = require('./users/schemas')

exports.apiDoc = {
	openapi: '3.0.1',
	info: {
		title: 'DinoJobs API',
		description: 'A Job Searching Platform with interview scheduling, video conferencing and shared code editor',
	},
	servers: [
		{
			url: 'http://localhost:3002/',
			description: 'Local Server',
		},
		{
			url: 'https://dino-jobs-server.onrender.com/',
			description: 'Production Server',
		}
	],
	tags: [
		{
			name: 'Users',
			description: "Users are the people who use the platform."
		},
		{
			name: 'Manager',
			description: "Managers are the people who manage the platform."
		},
		{
			name: 'Jobs',
			description: "Jobs are the jobs that are posted on the platform."
		}
	],
	paths: {
		"/auth/user/register": {
			post: users.createUser
		},
		"/auth/user/login": {
			post: users.loginUser
		},
		"/profile": {
			get: users.getUserProfile
		},
		"/update-user": {
			post: users.userUpdate
		},
		"/apply-job": {
			post: users.applyJob
		},
		'/get-all-invites': {
			get: users.getAllInvites
		},
		"/auth/manager/register": {
			post: manager.createManager
		},
		"/auth/manager/login": {
			post: manager.loginManager
		},
		'/invite-applicant': {
			post: manager.inviteApplicant
		},
		'/get-applicant-profile': {
			post: manager.getApplicantProfile
		},
		"/jobs": {
			get: jobs.getJobs
		},
		"/create-job": {
			post: jobs.createJob
		},
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
			createUserBody: users.createUserBody,
			createCompanyBody: users.createCompanyBody,
			createJobBody: jobs.createJobBody,
			createManagerBody: manager.createManagerBody,
			userAuthErrorResponse: users.userAuthErrorResponse,
		},
	},
}
