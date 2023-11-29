const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'id_user',
      }),
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
    }
  }
  Game.init({
    id_user: DataTypes.INTEGER,
    code: DataTypes.STRING,
    ronda: DataTypes.INTEGER,
    winner: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
