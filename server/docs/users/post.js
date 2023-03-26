const { userResponseBody } = require("./schemas");

exports.createUser = {
	tags: ['Users'],
	description: 'Creates a new user in the system',
	operationId: 'createUser',
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
		'404': {
			description: 'User not found',
			content: {
				'application/json': {
					schema: {
						ref: '#/components/schemas/userAuthErrorResponse',
					}
				}
			}
		}
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

