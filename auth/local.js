const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async function(ctx, next) {
    console.log('Local auth');
    await passport.authenticate('local', (err, user) => {
        if (!err) {
            if (user == false) {
                ctx.body = {
                    success: false,
                    errors: 'Wrong username/password' 
                }
            } else {
                const payload = {
                    id: user.id
                };
                const token = jwt.sign(payload, config.get('jwt-secret'), {expiresIn: '15m'});
                ctx.body = {
                    success: true,
                    token: 'JWT ' + token
                };
            }
        } else {
            ctx.body = {
                success: false,
                errors: 'Internal error'
            }
        }
    })(ctx,next);
}