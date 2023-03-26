exports.createJob = {
	tags: ['Jobs'],
	description: 'Create a new job in the database',
	operationId: 'createJob',
	security: [
		{
			bearerAuth: [],
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/createJobBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'201': {
			description: 'Job created successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Job created',
							},
						},
					},
				},
			},
		},
		'400': {

			description: 'Bad Request',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Bad Request',
							},
						},
					},
				},
			},
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
