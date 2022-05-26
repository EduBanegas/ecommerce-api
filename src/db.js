require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { DB_URL } = process.env;

// Connection of Sequelize with the database
const sequelize = new Sequelize(DB_URL, {
    logging: false,
});

// We inject with sequelize all the models that are inside src/models/
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach(file => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1]
]);
sequelize.models = Object.fromEntries(capsEntries);
console.log(sequelize.models);

// Relationships
const { User } = sequelize.models;


module.exports = sequelize;
