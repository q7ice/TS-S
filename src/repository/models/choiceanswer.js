const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChoiceAnswer extends Model {
    static associate({ User, ChoiceAnswerVariant }) {
      ChoiceAnswer.belongsTo(ChoiceAnswerVariant, { onDelete: 'cascade', hooks: true });
      ChoiceAnswer.belongsTo(User, { onDelete: 'cascade', hooks: true });
    }
  }

  const attributes = {
    isTrue: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };
  const options = {
    sequelize,
    modelName: 'ChoiceAnswer',
  };
  ChoiceAnswer.init(attributes, options);

  return ChoiceAnswer;
};
