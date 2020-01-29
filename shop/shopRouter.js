const Router = require('koa-router');
const router = new Router();
const shop = require('./get');
const createShop = require('./create');
const buyItem = require('./buy');


router.get('/:id', shop);
router.post('/create', createShop);
router.get('/:id/buy/:itemId', buyItem);

module.exports = router;