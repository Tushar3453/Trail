const userModel = require("../../models/user");

const findUserbyEmail = async (email) => {
    return await userModel.findOne(email);
}

const createUser = async (data) => {
    return await userModel.create(data);
}

module.exports = {
    findUserbyEmail,
    createUser
}