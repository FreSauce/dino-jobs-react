const { createJobBody } = require('./schemas');

exports.getJobs = {
  tags: ['Jobs'],
  description: 'Get all jobs',
  operationId: 'getJobs',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Jobs retrieved successfully',
      content: {
        'application/json': {
          schema: createJobBody,
        },
      },
    },
  },
}