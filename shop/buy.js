const passport = require('koa-passport');
const Item = require('../models/item');

module.exports = async function(ctx, next) {
    await passport.authenticate('jwt', async (err, user) => {
        
        if (user) {
            ctx.checkParams('id').toInt().isInt();
            ctx.checkParams('itemId').toInt().isInt();

            if (!ctx.errors) {
                let item = await Item.findOne({
                    where: {item_id : ctx.params.itemId, ShopId: ctx.params.id},    
                    attributes: {exclude: ['createdAt', 'updatedAt', 'ShopId']}
                });
                if (!item.UserId) {
                    await Item.update({UserId : user.id},
                        {
                            where: {item_id : ctx.params.itemId, ShopId: ctx.params.id}
                        });
                    ctx.body = {
                        success : true,
                        item: item
                    }
                } else {
                    ctx.body = {
                        success: false,
                        errors: "Already purchased"
                    }
                }
            } else {
                ctx.body = {
                    success: false,
                    errors: ctx.errors
                }
            }
        } else {
            ctx.body = {
                success: false,
                errors: "Not logged in"
            }
        }
    })(ctx, next);
}