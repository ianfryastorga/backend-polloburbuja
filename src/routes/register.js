const Router = require('koa-router');
const registerController = require('../controllers/register');
const loginController = require('../controllers/login');

const router = new Router();

router.post('/register', registerController.registerUser);
router.post('/login', loginController.loginUser);

module.exports = router;
