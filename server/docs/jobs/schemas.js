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
