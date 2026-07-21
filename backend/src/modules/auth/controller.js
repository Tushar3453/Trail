const validateRequest = require('../../middlewares/validateRequest');
const validator = require('./validator');
const service = require('./service');
const { successResponse } = require('../../utils/response');

const register = async (request, response) => {
  validateRequest(request, validator.register);
  const result = await service.register(request.body);
  successResponse(request, response, result);
};

const login = async (request, response) => {
  validateRequest(request, validator.login);
  const result = await service.login(request.body);
  successResponse(request, response, result);
};

module.exports = {
  register,
  login,
};
