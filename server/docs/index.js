const { create } = require('./users')

exports.apiDoc = {
	openapi: '3.0.1',
	info: {
		title: 'DinoJobs API',
		description: 'A Job Platform with interview scheduling, video conferencing and shared code editor',
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
			name: 'Admin',
			description: "Admins are the people who manage the platform."
		},
		{
			name: 'Jobs',
			description: "Jobs are the jobs that are posted on the platform."
		}
	],
	paths: {
		users: {
			post: create.createUser
		},
		managers: {
		}
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
			createUserBody: create.createUserBody,
		},
	},
}
