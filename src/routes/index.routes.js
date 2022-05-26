// Dependencies
const router = require('express').Router();
// Routes
const register_routes = require('./register.routes');


router.use('/register', register_routes);


module.exports = router;
