const Sequelize = require('sequelize');
const Model = require('sequelize').Model;
const sequelize = require('../db');
//const Item = require('./item');

class User extends Model {
    checkPassword(password) {
        return this.password == password;
    }
}
User.init({
    phone: {
        type : Sequelize.STRING,
        unique : true
    },
    password: {
        type: Sequelize.STRING
    },
    vkId: {
        type: Sequelize.STRING
    }
}, {
    sequelize
});
//User.hasMany(Item);

module.exports = User;