exports.createManagerBody = {
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
	},
}
