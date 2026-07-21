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
  const responseObj = {
    status: RESPONSE_STATUS.ERROR,
    ...data,
  };
  return response.json(responseObj);
};

module.exports = {
  successResponse,
  errorResponse,
};
