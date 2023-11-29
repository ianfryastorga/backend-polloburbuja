const Router = require('koa-router');

const router = new Router();

router.post('players.create', '/newplayer', async (ctx) => {
  const playerInfo = ctx.request.body;
  const { avatar } = playerInfo;
  console.log(avatar);
  // Verificar si ya hay 4 jugadores para el id_game
  const playerscount = await ctx.orm.Player.count({ where: { id_game: playerInfo.id_game } });
  if (playerscount >= 4) {
    ctx.body = `Ya hay 4 jugadores en la partida con id: '${playerInfo.id_game}'. No se puede agregar más jugadores.`;
    ctx.status = 400;
    return;
  }
  // Verificar si el nombre de usuario ya está en uso
  const user = await ctx.orm.User.findOne({ where: { username: playerInfo.username } });
  if (!user) {
    ctx.body = `Usuario '${playerInfo.username}' no encontrado.`;
    ctx.status = 404;
    return;
  }
  // Verificar si el jugador ya está en la partida
  let player = await ctx.orm.Player.findOne({ where: { id_user: user.id, id_game: playerInfo.id_game } });
  if (player) {
    ctx.body = `El jugador '${playerInfo.username}' ya está en la partida con id: '${playerInfo.id_game}'.`;
    ctx.status = 400;
    return;
  }
  try {
    // Crear nuevo jugador
    const admin = false;
    const { avatar } = playerInfo;

    // Verificar si hay jugadores con el mismo avatar
    const playersWithSameAvatar = await ctx.orm.Player.findAll({ where: { id_game: playerInfo.id_game, avatar } });
    if (playersWithSameAvatar.length > 0) {
      ctx.body = 'Ya hay jugadores con el mismo avatar en la partida. Elige otro avatar.';
      ctx.status = 400;
      return;
    }
    player = await ctx.orm.Player.create({
      id_user: user.id,
      id_game: playerInfo.id_game,
      num_player: playerscount + 1,
      admin,
      avatar,
    });
    ctx.body = {
      id_user: user.id,
      id_game: playerInfo.id_game,
    };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('players.get', '/getplayers', async (ctx) => {
  try {
    // Datos hardcodeados para prueba
    const datosDelTablero = [
      { jugador: 1, monedas: 30, estrellas: 1 },
      { jugador: 2, monedas: 43, estrellas: 2 },
      { jugador: 3, monedas: 5, estrellas: 0 },
      { jugador: 4, monedas: 25, estrellas: 4 },
    ];

    ctx.body = datosDelTablero;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('/realizarJugada', async (ctx) => {
  try {
    const posicion = ctx.request.body.nuevaPosicion;
    console.log(posicion);

    const { jugadorActual } = ctx.request.body;
    console.log(jugadorActual);

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
