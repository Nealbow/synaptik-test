const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const VKStrategy = require('passport-vkontakte').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('config');
const User = require('./models/user');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            let user = await User.findOne({where : {phone: username}});
            if (!user){
                return done(null, false);
            } 
            if (!user.checkPassword(password)) {
                return done(null, false);
            } 
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.get('jwt-secret')
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        let user = await User.findByPk(payload.id);
        if (user) return done(null, user);
        else return done(null, false);
    } catch (error) {
        return done(err);
    }
    
}));

passport.use(new VKStrategy({
    clientID: 7298023,
    clientSecret: 'vHIEB7zSQLgmlRTWjv0y',
    callbackURL: 'http://localhost:3000/auth/vk/callback'
    }, async function verifyCallback(accessToken, refreshToken, params, profile, done) {        
        try {
            let user = (await User.findOrCreate({where: {vkId : profile.id}}))[0];
            
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
));