const { userResponseBody } = require("../users/schemas");

exports.createManager = {
	tags: ['Manager'],
	description: 'Create a new manager in the database',
	operationId: 'createManager',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/createManagerBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'201': {
			description: 'Manager created successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Mail Sent',
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



exports.getApplicantProfile = {
	tags: ['Manager'],
	description: 'Get applicant profile',
	operationId: 'getApplicantProfile',
	security: [
		{
			bearerAuth: [],
		},
	],
	responses: {
		'200': {
			description: 'Applicant profile',
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/createManagerBody',
					},
				},
			},
		},
		'404': {
			description: 'Applicant not found',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Applicant not found',
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


exports.inviteApplicant = {
	tags: ['Manager'],
	description: 'Invite applicant to interview',
	operationId: 'inviteApplicant',
	security: [
		{
			bearerAuth: [],
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/inviteApplicantBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'200': {
			description: 'Applicant invited successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Invited Applicant',
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
	},
}


exports.loginManager = {
	tags: ['Manager'],
	description: 'Login manager',
	operationId: 'loginManager',
	requestBody: {
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						email: {
							type: 'string',
							example: "test@gmail.com",
						},
						password: {
							type: 'string',
							example: "test01",
						},
					},
				}
			},
		},
		required: true,
	},
	responses: {
		'200': {
			description: 'User logged in successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							token: {
								type: 'string',
								example: 'asdfoy8w90a8923h32u'
							},
							user: userResponseBody
						},
						message: {
							type: 'string',
							example: 'Login Successful',
						},
					},
				},
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
};




