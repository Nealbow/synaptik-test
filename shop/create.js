const Shop = require('../models/shop');
const Item = require('../models/item');
const passport = require('koa-passport');
const fs = require('fs');

module.exports = async function (ctx, next) {
    await passport.authenticate('jwt', async (err, user) => {
        let files = ctx.request.files.file;
        if (user) {
            ctx.checkBody('name').notEmpty();
            ctx.checkBody('description').notEmpty();
            ctx.checkBody('price').toInt().isInt();
            let params = ctx.request.body;

            if (!ctx.errors) {
                let shop = await Shop.create({
                    name: params.name,
                    description: params.description,
                    price: params.price
                });
                let itemId = 1;
                files.forEach(file => {
                    console.log(file.type);

                    if (/image\/.*/.test(file.type)) {
                        Item.create({
                            photo: file.path,
                            item_id: itemId++,
                            ShopId: shop.id
                        });
                    } else {
                        fs.unlink(file.path, err => { });
                    }
                });
                ctx.body = { success: true };
            } else {
                deleteFiles(files);
                ctx.body = {
                    success: false,
                    errors: ctx.errors
                }
            }
        } else {
            deleteFiles(files);
            ctx.body = {
                success: false,
                errors: "Not logged in"
            }
        }
    })(ctx, next);
}

function deleteFiles(files) {
    files.forEach(file => {
        fs.unlink(file.path, err => {});
    });
}