const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TextAnswerVariant extends Model {
    static associate({ Question }) {
      TextAnswerVariant.belongsTo(Question, { onDelete: 'cascade', hooks: true });
    }
  }

  const attributes = {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const options = {
    sequelize,
    modelName: 'TextAnswerVariant',
  };
  TextAnswerVariant.init(attributes, options);

  return TextAnswerVariant;
};
