'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'id_user',
      }),
      this.belongsTo(models.Game, {
        foreignKey: 'id_game',
      }),
      this.hasMany(models.Enhanser, {
        foreignKey: 'id',
      }),
      this.hasMany(models.Minigame, {
        foreignKey: 'id',
      })
    }
  }
  Player.init({
    id_user: DataTypes.INTEGER,
    id_game: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    num_player: DataTypes.INTEGER,
    coins: DataTypes.INTEGER,
    stars: DataTypes.INTEGER,
    admin: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
