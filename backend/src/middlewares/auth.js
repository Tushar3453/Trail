const helper = require('../modules/auth/helper');
const userDal = require('../modules/auth/DAL');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header is missing',
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Invalid authorization header',
    });
  }

  const token = parts[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token is missing',
    });
  }

  const payload = helper.verifyToken(token);

  const userId = payload.userId;
  const user = await userDal.findUserById(userId);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = user;
  next();
};

module.exports = auth;
