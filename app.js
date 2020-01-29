const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const serve = require('koa-static');
const mount = require('koa-mount');

const passport = require('koa-passport');
require('./passport-init');

const app = new Koa();
const router = new Router();
require('koa-validate')(app);

const authRouter = require('./auth/authRouter');
const shopRouter = require('./shop/shopRouter');

router.use('/auth', authRouter.routes());
router.use('/shop', shopRouter.routes());

app.use(bodyParser({
    formidable: {uploadDir: './resources/images', keepExtensions: true},
    multipart: true,
    urlencoded: true
}));

app.use(mount('/resources/images', serve('./resources/images')));
app.use(passport.initialize());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);