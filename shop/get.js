const Shop = require('../models/shop');
const Item = require('../models/item');
const op = require('sequelize').Op;

module.exports = async function(ctx, next) {
    ctx.checkParams('id').toInt().isInt();

    if(!ctx.errors) {
        let shop = await Shop.findByPk(ctx.params.id, {
            include: [{
                model: Item,
                attributes: {exclude: ['createdAt', 'updatedAt', 'ShopId', 'UserId']},
                where: {UserId: null},
                required: false
            }],
            attributes: {exclude : ['createdAt', 'updatedAt']}
        });
        if (shop) {
            ctx.body = {
                success: true,
                shop
            }
        } else {
            ctx.body = {
                success: false,
                errors: "Shop doesn't exist"
            }
        }
        
    } else {
        ctx.body = {
            success: false,
            errors: ctx.errors
        }
    }
}