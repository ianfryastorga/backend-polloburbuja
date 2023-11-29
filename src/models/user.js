const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Game, {
        foreignKey: 'id',
      }),
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
