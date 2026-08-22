const { RESPONSE_STATUS } = require('../constants/status');

const successResponse = (request, response, data) => {
  const responseObj = {
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      ...data,
    },
  };
  return response.json(responseObj);
};

const errorResponse = (request, response, data) => {
  const statusCode = data.statusCode || 500;
  const responseObj = {
    status: RESPONSE_STATUS.ERROR,
    ...data,
  };
  return response.status(statusCode).json(responseObj);
};

module.exports = {
  successResponse,
  errorResponse,
};
