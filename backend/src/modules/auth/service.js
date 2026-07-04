const DAL = require("./DAL");
const constants = require("./constants");
const bcrypt = require("bcryptjs");
const { SALT_ROUNDS } = require("../../constants/status");

const register = async (data) => {
    const existingUser = await DAL.findUserByEmail({ email: data.email });
    if (existingUser) {
        throw new Error(constants.USER_ALREADY_EXISTS_ERROR);
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    // create a new object instead of mutating data
    const userData = {
        ...data,
        password: hashedPassword
    }

    await DAL.createUser(userData);
    return {
        message: constants.REGISTERED_SUCCESSFULLY
    }

}

const login = async (data) => {
    const { email, password } = data;
    const user = await DAL.findUserByEmail({ email });

    if (!user) {
        throw new Error(constants.USER_NOT_FOUND);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error(constants.INCORRECT_PASSWORD);
    }

    return {
        message: constants.LOGIN_SUCCESSFUL
    }
}

module.exports = {
    register,
    login,
}