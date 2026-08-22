const { errorResponse } = require('../utils/response');

const errorHandler = (error, request, response, next) => {
  const statusCode = error.statusCode || 500;

  errorResponse(request, response, {
    statusCode,
    message: error.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
