exports.createUserBody = {
	type: 'object',
	properties: {
		full_name: {
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
		role: {
			type: 'string',
			example: 'User',
		}
	},
}

exports.userAuthErrorResponse = {
	type: 'object',
	properties: {
		message: {
			type: 'string',
			example: 'User not found',
		},
	},
}

exports.userResponseBody = {
	type: 'object',
	properties: {
		_id: {
			type: 'string',
			example: '60564fcb544047cdc3844818',
		},
		full_name: {
			type: 'string',
			example: 'John Snow',
		},
		email: {
			type: 'string',
			example: "test@gmail.com"
		},
		email_verified: {
			type: 'boolean',
			example: true,
		},
		role: {
			type: 'string',
			example: 'user',
		},
		avatar: {
			type: 'string',
			example: 'https://www.google.com/avatar.png',
		},
		resume: {
			type: 'string',
			example: 'https://www.google.com/resume.pdf',
		},
		phone: {
			type: 'string',
			example: '1234567890',
		},
		address: {
			type: 'string',
			example: '1234 Main St, City, State, 12345',
		},
		bio: {
			type: 'string',
			example: 'I am a user',
		},
		skills: {
			type: 'array',
			items: ["Skill1", "Skill2", "Skill3"]
		},
		applied_jobs: {
			type: 'array',
			items: ["Company1", "Company2", "Company3"],
		},
		saved_jobs: {
			type: 'array',
			items: ["Company1", "Company2", "Company3"],
		}
	}
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
