const { url } = require('koa-router');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      name: 'cristobal',
      lastname: 'tolorza',
      email: 'christ_tolorza@uc.cl',
      password: 'cristo123',
      username: 'christ31',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'pepito',
      lastname: 'rodriguez',
      email: 'pepito12@uc.cl',
      password: 'pepote',
      username: 'pepe1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'patricio',
      lastname: 'estrella',
      email: 'patricio12@uc.cl',
      password: 'patricio123',
      username: 'patricioestrella1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'bob',
      lastname: 'esponja',
      email: 'bob12@uc.cl',
      password: 'bobesponja',
      username: 'bob123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
