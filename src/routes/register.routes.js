// Dependencies 
const router = require('express').Router();
// Controllers
const { postNewUser_controller } = require('../controllers/register.controllers');


// Register routes
router.post('/postNewUser', postNewUser_controller);


module.exports = router;
