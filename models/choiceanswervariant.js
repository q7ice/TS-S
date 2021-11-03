const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChoiceAnswerVariant extends Model {
    static associate(models) {
      ChoiceAnswerVariant.hasMany(models.ChoiceAnswer);
    }
  }
  ChoiceAnswerVariant.init({
    value: DataTypes.STRING,
    isTrue: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ChoiceAnswerVariant',
  });
  return ChoiceAnswerVariant;
};
