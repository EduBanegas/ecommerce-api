const server = require('./src/app');
const sequelize = require('./src/db');

sequelize.sync({ force: false }).then(() => {
    server.listen(3001, () => console.log('Listen at port 3001'));
});
