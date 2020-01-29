const local = require('./local');
const vk = require('./vk');
const jwt = require('./jwt');
const Router = require('koa-router');
const router = new Router();

router.post('/local', local);
router.get('/vk', vk);
router.get('/vk/callback', vk.callback);
router.get('/', jwt);

module.exports = router;

