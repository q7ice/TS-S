const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Setting);
      User.hasMany(models.TextAnswer);
      User.hasMany(models.ChoiceAnswer);
      User.hasMany(models.Test);
      User.belongsToMany(models.Role, { through: 'UserRoles' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
