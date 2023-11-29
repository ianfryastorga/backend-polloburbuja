const { User } = require('../models');

const registerUser = async (ctx) => {
  try {
    const { name, lastname, email, password, username, avatar } = ctx.request.body;
    console.log('Usuario crear:');

    const newUser = await User.create({
      name,
      lastname,
      email,
      password,
      username,
      avatar
    });
    
    console.log('Usuario creado:', newUser);

    ctx.status = 201;
    ctx.body = { message: 'Usuario registrado exitosamente' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al registrar el usuario' };
  }
}

module.exports = {
  registerUser,
};
