const Sequelize = require('sequelize');
const Model = require('sequelize').Model;
const sequelize = require('../db');
const Shop = require('./shop');
const User = require('./user');

class Item extends Model { }
Item.init({
    photo: {
        type : Sequelize.STRING,
        allowNull: false
    },
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize
});

User.hasMany(Item);
Shop.hasMany(Item);


module.exports = Item;