const constants = require('./constants');

const getUserDetails = async (user) => {
  const { firstName, lastName, email, phone } = user;

  const userData = { firstName, lastName, email, phone };

  return {
    message: constants.USER_DETAILS_FETCHED_SUCCESSFULLY,
    userData,
  };
};

module.exports = {
  getUserDetails,
};
