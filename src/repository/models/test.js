const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate({ User, Question }) {
      Test.belongsTo(User);
      Test.hasMany(Question);
    }
  }

  const attributes = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };
  const options = {
    sequelize,
    modelName: 'Test',
  };
  Test.init(attributes, options);

  return Test;
};
