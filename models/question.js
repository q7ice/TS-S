const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.hasMany(models.TextAnswerVariant);
      Question.hasMany(models.ChoiceAnswerVariant);
      Question.hasMany(models.TextAnswer);
      Question.hasMany(models.ChoiceAnswer);
      Question.hasOne(models.QuestionType);
    }
  }
  Question.init({
    description: DataTypes.STRING,
    cost: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
