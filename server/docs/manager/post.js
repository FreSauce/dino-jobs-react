const { createManagerBody } = require("./schemas");

exports.createManager = {
	tags: ['Manager'],
	description: 'Create a new manager in the database',
	operationId: 'createManager',
	security: [
		{
			bearerAuth: [],
		},
	],
  parameters: [
		{
			name: 'role',
			in: 'path',
			description: 'The role of the user',
			required: true,
			schema: {
				type: 'string',
				enum: ['manager'],
			},
		},
		{
			name: 'email',
			in: 'path',
			description: 'The email of the user',
			required: true,
			schema: {
				type: 'string',
			},
		},
		{
			name: 'password',
			in: 'path',
			description: 'The password of the user',
			required: true,
			schema: {
				type: 'string',
			},
		}
	],
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/createUserBody',
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
	parameters: [
		{
			name: 'applicantId',
			in: 'path',
			description: 'The applicant id',

			required: true,
			schema: {
				type: 'string',
				example: '60564fcb544047cdc3844818',
			},
		},
	],
	responses: {
		'200': {
			description: 'Applicant profile',
			content: {
				'application/json': {
					schema: createManagerBody
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



exports.managerProfile = {
	tags: ['Manager'],
	description: 'Get manager profile',
	operationId: 'managerProfile',
	security: [
		{
			bearerAuth: [],
		},
	],
	responses: {
		'200': {
			description: 'Manager profile',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Managed Profile',
							},
						},
					},
				},
			},
		},
		'404': {
			description: 'Manager not found',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Manager not found',
							},
						},
					},
				},
			},
		},
	},
}

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

			

