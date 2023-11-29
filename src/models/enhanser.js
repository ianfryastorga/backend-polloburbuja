const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enhanser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'id_player',
      });
    }
  }
  Enhanser.init({
    id_player: DataTypes.INTEGER,
    name: DataTypes.STRING,
    effect: DataTypes.STRING,
    price: DataTypes.INTEGER,
    icon: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Enhanser',
  });
  return Enhanser;
};
