const validateRequest = require('../../middlewares/validateRequest');
const validator = require('./validator');
const service = require('./service');
const { successResponse } = require('../../utils/response');

const getUserDetails = async (request, response) => {
  const result = await service.getUserDetails(request.user);
  successResponse(request, response, result);
};

module.exports = {
  getUserDetails,
};
