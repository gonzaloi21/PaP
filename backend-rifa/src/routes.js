const Router = require('koa-router');

const participants = require('./routes/participants.js');
const prizes = require('./routes/prizes.js');

const router = new Router();


router.use('/participants', participants.routes());
router.use('/prizes', prizes.routes());


module.exports = router;
