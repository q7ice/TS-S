const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionType extends Model {
    static associate(models) {
      QuestionType.hasMany(models.Question);
    }
  }
  QuestionType.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'QuestionType',
  });
  return QuestionType;
};
