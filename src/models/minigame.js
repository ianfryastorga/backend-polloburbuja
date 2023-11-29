'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Minigame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'id_player',
      })
    }
  }
  Minigame.init({
    id_player: DataTypes.INTEGER,
    name: DataTypes.STRING,
    scores: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Minigame',
  });
  return Minigame;
};