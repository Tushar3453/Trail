const AppError = require('../utils/AppError');
const { HTTP_STATUS } = require('../constants/status');

const validateRequest = (req, schema) => {
  const validationSchema = schema.body;

  const { error, value } = validationSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, HTTP_STATUS.BAD_REQUEST);
  }
  req.body = value;
};

module.exports = validateRequest;
