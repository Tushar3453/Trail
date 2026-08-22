const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');
const constants = require('./constants');
const { HTTP_STATUS } = require('../../constants/status');
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  catch (error) {
    console.log(error);
    throw new AppError(constants.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
