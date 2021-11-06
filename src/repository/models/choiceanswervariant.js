const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChoiceAnswerVariant extends Model {
    static associate({ Question, ChoiceAnswer }) {
      ChoiceAnswerVariant.belongsTo(Question, { onDelete: 'cascade', hooks: true });
      ChoiceAnswerVariant.hasMany(ChoiceAnswer);
    }
  }

  const attributes = {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isTrue: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };
  const options = {
    sequelize,
    modelName: 'ChoiceAnswerVariant',
  };
  ChoiceAnswerVariant.init(attributes, options);

  return ChoiceAnswerVariant;
};
