const DAL = require("./DAL");
const constants = require("./constants");

const register = async (data) => {
    // check if user already exists
    const existingUser = await DAL.findUserbyEmail({ email: data.email });
    if (existingUser) {
        throw new Error(constants.USER_ALREADY_EXISTS_ERROR);
    }

    const user = await DAL.createUser(data);
    return {
        message:constants.REGISTERED_SUCCESSFULLY,
        user,
    }

}

const login = async (data) => {
    const { email, password } = data;
    const user = await DAL.findUserbyEmail({email});

    if (!user) {
        throw new Error(constants.USER_NOT_FOUND);
    }

    if (user.password != password) {
        throw new Error(constants.INCORRECT_PASSWORD);
    }

    return{
        message:constants.LOGIN_SUCCESSFULL,
        user:user.email,
    }
}

module.exports = {
    register,
    login,
}