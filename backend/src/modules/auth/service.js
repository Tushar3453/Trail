const DAL = require('./DAL');
const constants = require('./constants');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS, HTTP_STATUS } = require('../../constants/status');
const helper = require('./helper');
const AppError = require('../../utils/AppError');

const register = async (data) => {
  const existingUser = await DAL.findUserByEmail(data.email);
  if (existingUser) {
    throw new AppError(constants.USER_ALREADY_EXISTS_ERROR, HTTP_STATUS.CONFLICT);
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  // create a new object instead of mutating data
  const userData = {
    ...data,
    password: hashedPassword,
  };

  await DAL.createUser(userData);
  return {
    message: constants.REGISTERED_SUCCESSFULLY,
  };
};

const login = async (data) => {
  const { email, password } = data;
  const user = await DAL.findUserByEmail(email);

  if (!user) {
    throw new AppError(constants.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new AppError(constants.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const token = helper.generateToken(user._id);

  return {
    message: constants.LOGIN_SUCCESSFUL,
    token,
  };
};

module.exports = {
  register,
  login,
};
