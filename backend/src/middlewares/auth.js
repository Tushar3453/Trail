const helper = require('../modules/auth/helper');
const userDal = require('../modules/auth/DAL');
const { HTTP_STATUS } = require('../constants/status');
const constants = require('../modules/auth/constants');
const AppError = require('../utils/AppError');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(constants.TOKEN_MISSING, HTTP_STATUS.UNAUTHORIZED);
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new AppError(constants.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }

  const token = parts[1];

  if (!token) {
    throw new AppError(constants.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }

  const payload = helper.verifyToken(token);

  const userId = payload.userId;
  const user = await userDal.findUserById(userId);

  if (!user) {
    throw new AppError(constants.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED);
  }
  req.user = user;
  next();
};

module.exports = auth;
