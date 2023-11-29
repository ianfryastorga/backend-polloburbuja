const Router = require('koa-router');
const registerController = require('../controllers/login');

const router = new Router();

router.post('/login', loginController.loginUser);

module.exports = router;