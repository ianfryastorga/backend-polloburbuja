'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enhansers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_player: {
        type: Sequelize.INTEGER,
        references: { model: "Players", key: "id" }
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          isAlpha: true
        }
      },
      effect: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true,
          isInt: true,
        }
      },
      icon: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Enhansers');
  }
};
