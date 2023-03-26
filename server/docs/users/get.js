const { createUserBody, createJobBody } = require('./schemas');

exports.getUserProfile = {
	tags: ['Users'],
	description: 'Get user profile',
	operationId: 'getUserProfile',
	security: [
		{
			bearerAuth: [],
		},
	],
	responses: {
		'200': {
			description: 'User profile retrieved successfully!',
			content: {
				'application/json': {
					schema: createUserBody
				},
			},
		},
		'404': {
			description: 'User not found',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'User not found',
							},
						},
					},
				},
			},
		},
		'401': {
			description: 'Unauthorized',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {

							message: {
								type: 'string',
								example: 'Unauthorized',
							}
						}
					}
				}
			}
		},
		'500': {
			description: 'Internal Server Error',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Internal Server Error',
							},
						},
					},
				},
			},
		},
	},
};



exports.getAllInvites = {
	tags: ['Users'],
	description: 'Get all invites',
	operationId: 'getAllInvites',
	security: [
		{
			bearerAuth: [],
		},
	],
	responses: {
		'200': {
			description: 'Invites retrieved successfully!',
			content: {
				'application/json': {
					schema:
						createJobBody,
					createUserBody,
					type: 'object',
					properties: {
						message: {
							type: 'string',
							example: 'https://www.google.com',
						}
					},

				},
			},
		},
		'401': {
			description: 'Unauthorized',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {

							message: {
								type: 'string',
								example: 'Unauthorized',
							}
						}
					}
				}
			}
		},
		'500': {
			description: 'Internal Server Error',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Internal Server Error',
							},
						},
					},
				},
			},
		},
	},
}

