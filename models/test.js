const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate(models) {
      Test.hasMany(models.Question);
    }
  }
  Test.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Test',
  });
  return Test;
};
