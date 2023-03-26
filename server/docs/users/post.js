exports.createUser = {	
	tags: ['Users'],
	description: 'Creates a new user in the system',
	operationId: 'createUser',
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
				enum: ['user'],
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
			description: 'User created successfully!',
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






exports.userUpdate = {
	tags: ['Users'],
	description: 'Update user profile',
	operationId: 'updateUser',
	security: [
		{
			bearerAuth: [],
		},
	],


	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/updateUserBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'200': {
			description: 'User profile updated successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'User updated successfully!',
							},
						},
					},
				},
			},
		},
	},
}


exports.applyJob = {
	tags: ['Users'],
	description: 'Apply for a job',
	operationId: 'applyJob',
	security: [
		{
			bearerAuth: [],
		},
	],
	parameters: [
		{
			name: 'id',
			in: 'path',
			description: 'Job ID',
			required: true,
			schema: {
				type: 'string',
				example: '60564fcb544047cdc3844818',
			},
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/applyJobBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'200': {
			description: 'Job applied successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							result: {
								type: 'string',
								example: 'Job Applied',
							},
						},
					},
				},
			},
		},
		'404': {
			description: 'Job not found',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							message: {
								type: 'string',
								example: 'Job not found',
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





exports.loginUser = {
	tags: ['Users'],
	description: 'Login user',
	operationId: 'loginUser',
	parameters: [
		{
			name: 'email',
			in: 'query',
			description: 'User email',
			required: true,
			schema: {
				type: 'string',
				example: "test@gmail.com"
			},
		},
		{
			name: 'password',
			in: 'query',
			description: 'User password',
			required: true,
			schema: {
				type: 'string',
				example: "123456"
			},
		},
	],
	requestBody: {
		content: {
			'application/json': {
				
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
              token : {
								type: 'string',
								example: 'asdfoy8w90a8923h32u'
							},
							user : {
								type: 'object',
								properties: {
									_id: {
										type: 'string',
										example: '60564fcb544047cdc3844818',
									},
									fullName: {
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
									applied_jobs: {
										type: 'array',
										items: ["Company1", "Company2", "Company3"],
									},
						  	},
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
	},
}

