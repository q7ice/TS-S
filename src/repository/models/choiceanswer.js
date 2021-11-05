const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChoiceAnswer extends Model {
    static associate({ User, ChoiceAnswerVariant }) {
      ChoiceAnswer.belongsTo(ChoiceAnswerVariant);
      ChoiceAnswer.belongsTo(User);
    }
  }

  const attributes = {
  };
  const options = {
    sequelize,
    modelName: 'ChoiceAnswer',
  };
  ChoiceAnswer.init(attributes, options);

  return ChoiceAnswer;
};
