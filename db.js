const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.dbConfig.db, config.dbConfig.login, config.dbConfig.password, {
    host: config.dbConfig.host,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Success database connect!');
}).catch(err => {
    console.error('Unable to connect', err);
});

module.exports = sequelize;

module.exports.syncAll = function() {
    sequelize.sync();
};