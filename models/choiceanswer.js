const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChoiceAnswer extends Model {
    static associate(models) {
    }
  }
  ChoiceAnswer.init({
    questionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ChoiceAnswer',
  });
  return ChoiceAnswer;
};
