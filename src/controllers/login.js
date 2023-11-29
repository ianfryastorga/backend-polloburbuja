
const { User } = require('../models');

const loginUser = async (ctx) => {
    try {
        const { email, password } = ctx.request.body;

        const user = await User.findOne({ email });
        console.log(email, password)

        if (!user || user.password !== password) {
            ctx.status = 401;
            ctx.body = { error: 'Credenciales incorrectas' };
            return;
    }

    ctx.body = { message: 'Inicio de sesión exitoso' };
    } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error interno del servidor' };
    }
};

module.exports = {
    loginUser,
};