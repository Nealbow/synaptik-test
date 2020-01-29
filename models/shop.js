const Sequelize = require('sequelize');
const Model = require('sequelize').Model;
const sequelize = require('../db');
//const Item = require('./item');

class Shop extends Model { }
Shop.init({
    name: {
        type : Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description : {
        type : Sequelize.STRING,
        allowNull: false
    },
    price : {
        type : Sequelize.INTEGER,
        allowNull : false
    }

}, {
    sequelize
});

//Shop.hasMany(Item);


module.exports = Shop;