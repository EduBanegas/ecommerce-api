const sequelize = require('../db');
const { User } = sequelize.models


// User services
const postNewUser_service = async( userData ) => {
    const newUser = User.create(userData)

    return newUser;
}

const getUserById_service = async userId => {

    const userFound = await User.findByPk(userId)

    return userFound;
};

const getUserByUsername_service = async username => {
    
    const userFound = await User.findOne({
        where: {
            username
        }
    });

    return userFound;
};


module.exports = {
    postNewUser_service,
    getUserById_service,
    getUserByUsername_service
}