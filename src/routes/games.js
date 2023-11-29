const Router = require('koa-router');
const router = new Router();

// Crear un juego
router.post("games.create", "/newgame", async (ctx) => {
    const gameInfo = ctx.request.body;
    let game = await ctx.orm.Game.findOne({ where: { code: gameInfo.code } })
    if (game) {
        ctx.body = `El código de la partida '${gameInfo.code}' ya existe`;
        ctx.status = 400;
        return;
    }
    let user = await ctx.orm.User.findOne({ where: { username: gameInfo.username } })
    try {
        game = await ctx.orm.Game.create({
            id_user: user.id,
            code: gameInfo.code,
        })
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    ctx.body = {
        id_game: game.id,
        code: game.code,
        ronda: game.ronda
    };
    ctx.status = 201;
})

router.post("games.join", "/joingame", async (ctx) => {
    try {
        const gameInfo = ctx.request.body;
        const game = await ctx.orm.Game.findOne({ where: { code: gameInfo.code } })

        if (game) {
            ctx.body = game;
            ctx.status = 200;
        } else {
            ctx.body = "Juego no encontrado";
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

// Entrega información del juego a los clientes
router.post("game.getdatagame", "/datagame", async (ctx) => {
    try {
        const id_game = ctx.request.body.id;
        const gameInfo = await ctx.orm.Game.findOne({where: { id: id_game }});
        const gameplayers = await ctx.orm.Player.findAll({where: { id_game: id_game }});

        ctx.body = {
            game: gameInfo,
            players: gameplayers
        };
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
});

router.post("game.deletedatagame", "/deletegame", async (ctx) => {
    try {
        const id_game = ctx.request.body.id;

        const result1 = await ctx.orm.Player.destroy({where: { id_game: id_game }});
        if (result1 === 0) {
            // Si result es 0, significa que no se eliminó ningún registro
            ctx.body = "Los players no fueron encontrados.";
            ctx.status = 404;
        } else {
            ctx.body = "Players eliminados correctamente.";
            ctx.status = 200;
        }
        const result2 = await ctx.orm.Game.destroy({
            where: { id: id_game }
        });

        if (result2 === 0) {
            ctx.body = "El juego no fue encontrado.";
            ctx.status = 404;
        } else {
            ctx.body = "Juego eliminado correctamente.";
            ctx.status = 200;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
});

// Cambia algún atributo de un juego
router.post("game.change", "/change", async(ctx) => {
    try{
        const { game_id } = ctx.request.body;
        console.log(game_id);
        const game = await ctx.orm.Game.findOne({where:{id: game_id}});
        const result = await game.update(
            { ronda: game.ronda += 1 },
        )
        ctx.body = result;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;