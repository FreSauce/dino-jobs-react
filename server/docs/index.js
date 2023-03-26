const { users } = require('./users')
const { jobs } = require('./jobs')
const { manager } = require('./manager')

exports.apiDoc = {
	openapi: '3.0.1',
	info: {
		title: 'DinoJobs API',
		description: 'A Job Searching Platform with interview scheduling, video conferencing and shared code editor',
		termsOfService: 'https://mysite.com/terms',
		contact: {
			name: 'Developer name',
			email: 'dev@example.com',
			url: 'https://devwebsite.com',
		}
	},
	servers: [
		{
			url: 'http://localhost:3002/',
			description: 'Local Server',
		},
		{
			url: 'https://api.mysite.com',
			description: 'Production Server',
		},
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
		"/user/register": {
			post: users.createUser
		},
		"/manager/register": {
			post: manager.createManager
		},
		"/user/login": {
			post: users.loginUser
		},
		"/manager/login": {
			post: manager.loginManager
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
		"/jobs": {
			get: jobs.getJobs
		},
		'/get-applicant-profile' : {
			post: manager.getApplicantProfile
		},
		"/create-job": {
			post: jobs.createJob
		},
	  "/manager/home": {
			post: manager.managerProfile
		},
		'/invite-applicant': {
			post: manager.inviteApplicant
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
			createJobBody: users.createJobBody,
		},
	},
}
