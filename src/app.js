// Dependencies
const express = require('express');
const morgan = require('morgan');
// Routes
const routes = require('./routes/index.routes');


// Server configuration
const server = express();

// Middelwares configuration
server.use(express.json());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

// Router
server.use('/', routes);

// Final error catcher
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;

    console.error(err);
    res.status(status).send({ error: message, data: [] });
});


module.exports = server;
