exports.createUserBody = {
	type: 'object',
	properties: {
		fullName: {
			type: 'string',
			example: 'John Snow',
		},
		email: {
			type: 'string',
			example: 'john.snow@email.com',
		},
		password: {
			type: 'string',
			description: "unencrypted user's password",
			example: '!1234aWe1Ro3$#',
		},
		email_verified: {
			type: 'boolean',
			example: true,
		},
		role: {
			type: 'string',
			example: 'User',
		},
		applied_jobs: {
			type: 'array',
			items: ["Company1", "Company2", "Company3"],
		},
	},
}



exports.createCompanyBody = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			example: 'Company1',
		},
		description: {
			type: 'string',
			example: 'Company1 description',
		},
		website: {
			type: 'string',
			example: 'https://www.company1.com',
		},
		logo: {
			type: 'string',
			example: 'https://www.company1.com/logo.png',
		},
	},
}

exports.createJobBody = {
	type: 'object',
	properties: {
		title: {
			type: 'string',
			example: 'Software Engineer',
		},
		description: {
			type: 'string',
			example: 'Software Engineer description',
		},
		company: {
			type: 'string',
			example: '605636683f6e29c81c8b2db0',
		},
		location: {
			type: 'string',
			example: 'New York, NY',
		},
		remote: {
			type: 'boolean',
			example: true,
		},
		salary: {
			type: 'string',
			example: '100000',
		},
	},
}
