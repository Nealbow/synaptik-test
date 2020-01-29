const passport = require('koa-passport');

module.exports = async function(ctx, next) {
    await passport.authenticate('jwt', (err, user) => {
        if (user) {
            ctx.body = {
                success: true,
                message: 'Hello' + user.id
            }
        } else {
            ctx.body = {
                success: false,
                errors: 'Wrong token or internal error. Try to get new token'
            }
        }
    })(ctx, next);
}