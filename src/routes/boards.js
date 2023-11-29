const Router = require('koa-router');

const router = new Router();
const Player = require('../models/player');

router.get('/boardData', async (ctx) => {
  try {
    // Datos hardcodeados para prueba
    const datosDelTablero = [
      { jugador: 1, monedas: 30, estrellas: 1 },
      { jugador: 2, monedas: 43, estrellas: 2 },
      { jugador: 3, monedas: 5, estrellas: 0 },
      { jugador: 4, monedas: 25, estrellas: 4 },
    ];
    // const jugadores = await Player.findAll({ attributes: ['num_player', 'position'] });

    ctx.body = datosDelTablero;
    // ctx.body = jugadores;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('/realizarJugada', async (ctx) => {
  try {
    const { jugador } = ctx.request.body;
    const { nuevaPosicion } = ctx.request.body;

    const jugadorActual = await Player.findOne({ where: { num_player: jugador } });
    const posicionActual = jugadorActual.position;

    let nuevaPosicionFinal;
    if (nuevaPosicion < 29) {
      nuevaPosicionFinal = posicionActual + nuevaPosicion;
    } else {
      nuevaPosicionFinal = nuevaPosicion - (28 - posicionActual);
    }

    await Player.update({ position: nuevaPosicionFinal }, { where: { num_player: jugador } });

    const respuesta = {
      mensaje: 'Jugada realizada con éxito',
    };

    ctx.body = respuesta;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
