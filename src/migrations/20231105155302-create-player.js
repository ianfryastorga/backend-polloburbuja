'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull:  true,
        references: { model: "Users", key: "id" }
      },
      id_game: {
        type: Sequelize.INTEGER,
        references: { model: "Games", key: "id" }
      },
      num_player: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true,
          isInt: true,
        }
      },
      position: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true,
          isInt: true,
        },
        defaultValue: 0
      },
      coins: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true,
          isInt: true,
        },
        defaultValue: 10
      },
      stars: {
        type: Sequelize.INTEGER,
        validate: {
          isNumeric: true,
          isInt: true,
        },
        defaultValue: 0
      },
      admin: {
        type: Sequelize.BOOLEAN
      },
      avatar: {
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
    await queryInterface.dropTable('Players');
  }
};
