const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({
      Test, TextAnswer,
      TextAnswerVariant, ChoiceAnswerVariant,
    }) {
      Question.belongsTo(Test, { onDelete: 'cascade', hooks: true });
      Question.hasMany(TextAnswer);
      Question.hasMany(ChoiceAnswerVariant);
      Question.hasOne(TextAnswerVariant);
    }
  }

  const attributes = {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const options = {
    sequelize,
    modelName: 'Question',
  };
  Question.init(attributes, options);

  return Question;
};
