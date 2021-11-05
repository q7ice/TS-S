const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TextAnswer extends Model {
    static associate({ User, Question }) {
      TextAnswer.belongsTo(User);
      TextAnswer.belongsTo(Question);
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
    modelName: 'TextAnswer',
  };
  TextAnswer.init(attributes, options);

  return TextAnswer;
};
