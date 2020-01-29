const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = passport.authenticate('vkontakte');
module.exports.callback = async function(ctx, next) {
    await passport.authenticate('vkontakte', {session : false}, (err, user) => {
        if (!err) {
            const payload = {
                id: user.id
            };
            const token = jwt.sign(payload, config.get('jwt-secret'), {expiresIn: '15m'});
            ctx.body = {
                success: true,
                token: 'JWT ' + token
            };
        } else {
            
            ctx.body = {
                success: false,
                errors: err
            }
        }
        
    })(ctx, next);
}