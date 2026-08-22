const userModel = require('../../models/user');

const findUserByEmail = async (email) => {
  return userModel.findOne({ email });
};

const createUser = async (data) => {
  return userModel.create(data);
};

const findUserById = async (id) => {
  return userModel.findById(id).select('-password');
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
