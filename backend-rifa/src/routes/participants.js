const Router = require('koa-router');
const router = new Router();

// Endpoint que retorna a los ganadores de la rifa con información de premios
router.get('/participants/winners', '/winners', async (ctx) => {
    try {
        const winners = await ctx.orm.Participant.findAll({
            where: { winner: true },
            order: [['prize', 'DESC']], // Ordena por el atributo "prize" en forma decreciente
            // include: [{ model: ctx.orm.Reward, as: 'reward', attributes: ['id', 'prize_name', 'brand'] }] 
        });

        // Mapea los resultados para construir un JSON con la información deseada
        // const winnersWithPrizes = winners.map((winner) => {
        //     return {
        //         id: winner.id,
        //         number: winner.number,
        //         name: winner.name,
        //         lastname: winner.lastname,
        //         phone: winner.phone,
        //         prize: winner.prize,
        //         createdAt: winner.createdAt,
        //         updatedAt: winner.updatedAt,
        //         reward: {
        //             id: winner.reward.id,
        //             prize_name: winner.reward.prize_name,
        //             brand: winner.reward.brand,
        //         }
        //     };
        // });

        ctx.body = winners;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
        console.error(error);
    }
});


//endpoint que retorna que retorna un nuevo ganador de manera aleatoria
//si el request es "agua" no cambia el atributo winner, si es "sorteo" cambia el atributo winner a true
router.post('/participants/sort', '/sort', async (ctx) => {
    try {
        //vemos si quedan premios por sortear
        const prizes = await ctx.orm.Reward.findAll({ where: { sorted: false } });
        if (prizes.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No hay premios para sortear.' };
            return;
        }
        //obtenemos un ganador aleatorio que no haya gaando antes
        const participants = await ctx.orm.Participant.findAll({ where: { winner: false } });
        if (participants.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No hay participantes disponibles para el sorteo.' };
            return;
        }
        const winner = participants[Math.floor(Math.random() * participants.length)];
        console.log('Ganador:', winner.get());
        //si el request es "sorteo" cambiamos el atributo winner a true
        const { command } = ctx.request.body;
        if (command === "sorteo") {
            // Obtener el próximo número de premio secuencial
            const nextPrizeNumber = await ctx.orm.Reward.count({ where: { sorted: true } }) + 1;
            // Encontrar el premio correspondiente en la tabla Rewards y que no haya sido sorteado
            const rewardDetails = prizes.find((p) => p.id === nextPrizeNumber);
            //actualizamos sorted
            // Verificar si se encontró el premio antes de actualizar
            if (rewardDetails) {
                // Actualizar el participante ganador con el nuevo número de premio
                await winner.update({ winner: true, prize: nextPrizeNumber });
                // Actualizar el atributo "sorted" del premio a true
                await rewardDetails.update({ sorted: true });
                //editamos atributos de particiapnte para incluir el premio
                await winner.update({ prize_name: rewardDetails.prize_name, brand: rewardDetails.brand });
                console.log('Detalles del ganador:', winner.get());
                ctx.body = { winner: { ...winner.get() } };
            } else {
                console.log('Premio no encontrado en la tabla Rewards.');
                // Si no se encuentra el premio, se envía solo la información del ganador
                ctx.body = { winner: { ...winner.get() } };
            }
            ctx.body = { winner: { ...winner.get() } };
        }
        //si el request es "agua" no cambiamos el atributo winner
        else if (command === "agua") {
            // En este caso, no hay premio asociado, por lo que solo se envía la información del ganador
            ctx.body = { winner: winner.get() };
        } else {
            ctx.body = { message: 'Comando no reconocido.' };
        }
    }
    catch (error) {
        ctx.body = { error: 'Error interno del servidor.' };
        ctx.status = 500;
        console.error(error);
    }
});

    // try {
    //     const participants = await ctx.orm.Participant.findAll({ where: { winner: false } });

    //     if (participants.length === 0) {
    //         ctx.status = 404;
    //         ctx.body = { error: 'No hay participantes disponibles para el sorteo.' };
    //         return;
    //     }

    //     const { command } = ctx.request.body;

    //     console.log('Comando recibido:', command);

    //     if (command === "sorteo") {
    //         // //obtenemos un ganador random que no haya gaando antes
    //         const winner = participants[Math.floor(Math.random() * participants.length)];
    //         console.log('Ganador:', winner.get());


    //         // Obtener el próximo número de premio secuencial
    //         const nextPrizeNumber = await ctx.orm.Participant.count({ where: { winner: true } }) + 1;
    //         // Encontrar el premio correspondiente en la tabla Rewards y que no haya sido sorteado
    //         const rewardDetails = await ctx.orm.Reward.findOne({ where: { id: nextPrizeNumber, sorted: false } });
    //         //actualizamos sorted

    //         // Verificar si se encontró el premio antes de actualizar
    //         if (rewardDetails) {
    //             // Actualizar el participante ganador con el nuevo número de premio
    //             await winner.update({ winner: true, prize: nextPrizeNumber });
    //             // Actualizar el atributo "sorted" del premio a true
    //             await rewardDetails.update({ sorted: true });
    //             //editamos atributos de particiapnte para incluir el premio
    //             await winner.update({ prize_name: rewardDetails.prize_name, brand: rewardDetails.brand });
    //             console.log('Detalles del ganador:', winner.get());
    //             ctx.body = { winner: { ...winner.get() } };
    //         } else {
    //             console.log('Premio no encontrado en la tabla Rewards.');
    //             // Si no se encuentra el premio, se envía solo la información del ganador
    //             ctx.body = { winner: { ...winner.get() } };
    //         }

    //         ctx.body = { winner: { ...winner.get() } };

    //     } else if (command === "agua") {
    //         const winner = participants[Math.floor(Math.random() * participants.length)];
    //         console.log('Ganador:', winner.get());

    //         // En este caso, no hay premio asociado, por lo que solo se envía la información del ganador
    //         ctx.body = { winner: winner.get() };
    //     } else {
    //         ctx.body = { message: 'Comando no reconocido.' };
    //     }

    //     ctx.status = 200;
    // } catch (error) {
    //     ctx.body = { error: 'Error interno del servidor.' };
    //     ctx.status = 500;
    //     console.error(error);
//     }
// );



//endpoint que reinica sorteo, es decir, cambia el atributo winner a false de todos los participantes
router.get('/participants/reset', '/reset', async (ctx) => {
    try {
        const participants = await ctx.orm.Participant.findAll({ where: { winner: true } });

        if (participants.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No hay participantes ganadores.' };
            return;
        }

        participants.forEach(async (participant) => {
            await participant.update({ winner: false });
        });

        const prizes = await ctx.orm.Reward.findAll();
        prizes.forEach(async (prize) => {
            await prize.update({ sorted: false });
        });

        ctx.body = { message: 'Sorteo reiniciado.' };
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: 'Error interno del servidor.' };
        ctx.status = 500;
        console.error(error);
    }
});

//get que resetea la tabla para poblarla con nuevos datos
router.get('/participants/resetAll', '/resetAll', async (ctx) => {
    try {
        const participants = await ctx.orm.Participant.findAll();

        if (participants.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No hay participantes.' };
            return;
        }

        participants.forEach(async (participant) => {
            await participant.destroy();
        });

        ctx.body = { message: 'Tabla participantes reseteada.' };
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: 'Error interno del servidor.' };
        ctx.status = 500;
        console.error(error);
    }
});


module.exports = router;
