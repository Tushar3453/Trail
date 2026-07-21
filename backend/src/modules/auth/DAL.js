const userModel = require('../../models/user');

const findUserByEmail = async (email) => {
  return await userModel.findOne(email);
};

const createUser = async (data) => {
  return await userModel.create(data);
};

const findUserById = async (id) => {
  return await userModel.findById(id);
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
