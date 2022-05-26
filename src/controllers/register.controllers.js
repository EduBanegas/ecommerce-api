// Dependencies 
const bcrypt = require('bcrypt');
// Services 
const { getUserByUsername_service, postNewUser_service } = require('../services/user.services')


// Register controllers
const BCRUPT_SALT_ROUNDS = 12;
const postNewUser_controller = async (req, res, next) => {
    try {
        const { username, password, name, lastname } = req.body;

        const userFound = await getUserByUsername_service(username);

        if (userFound) {
            throw new Error('Username already exists');
        }

        if (!username || !password || !name || !lastname) {
            throw new Error('Some fields are empty');
        }

        bcrypt.hash(password, BCRUPT_SALT_ROUNDS).then(async hashedPassword => {
            // Create a new user
            const newUser = await postNewUser_service({
                username,
                password: hashedPassword,
                name,
                lastname
            });

            if(newUser) {
                return res.json({
                    message: 'User created successfully',
                    data: [newUser]
                });
            }
            
            throw new Error('Error creating user')
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { 
    postNewUser_controller
};
