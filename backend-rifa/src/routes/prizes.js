const Router = require('koa-router');
const router = new Router();

//endpoint que obtiene el siguiente premio a sortear 
//ordenamos los premios por id y sacamos el primero con sorted = false
router.get('/prizes/next', '/next', async (ctx) => {
    try {
        const prizes = await ctx.orm.Reward.findAll({ order: [['id', 'ASC']] });
        const prize = prizes.find((p) => p.sorted === false);
        if (!prize) {
            ctx.status = 204;
            ctx.body = { error: 'No hay premios para sortear.' };
            return;
        }
        ctx.body = prize;
        ctx.status = 200;
        }
        catch (error) {
        ctx.body = { error: 'Error interno del servidor.' };
        ctx.status = 500;
        console.error(error);
    }});

//endopint que borra los datos de premios para poblarla con otros datos
router.get('/prizes/resetAll', '/resetAll', async (ctx) => {
    try {
        const prizes = await ctx.orm.Reward.findAll();
        if (prizes.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No hay premios.' };
            return;
        }
        prizes.forEach(async (prize) => {
            await prize.destroy();
        });
        ctx.body = { message: 'Tabla premios reseteada.' };
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: 'Error interno del servidor.' };
        ctx.status = 500;
        console.error(error);
    }
});

module.exports = router;
