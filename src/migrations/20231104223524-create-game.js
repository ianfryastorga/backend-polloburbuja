'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ronda: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true,
          isInt: true,
        },
        defaultValue: 0
      },
      winner: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};
