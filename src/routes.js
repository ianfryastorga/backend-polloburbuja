const Router = require('koa-router');
const dotenv = require('dotenv');
const users = require('./routes/users.js');
const games = require('./routes/games.js');
const players = require('./routes/players.js');
const boards = require('./routes/boards.js');
const register = require('./routes/register');

dotenv.config();

const router = new Router();

router.use('/users', users.routes());

router.use('/games', games.routes());

router.use('/players', players.routes());

router.use('/boards', boards.routes());

router.use('/api', register.routes());

module.exports = router;
