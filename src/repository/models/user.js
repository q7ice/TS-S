const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Test, TextAnswer, ChoiceAnswer,
    }) {
      User.hasMany(Test);
      User.hasMany(TextAnswer);
      User.hasMany(ChoiceAnswer);
    }
  }

  const attributes = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'light',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Jhon Doe',
    },
  };
  const options = {
    sequelize,
    modelName: 'User',
  };
  User.init(attributes, options);

  return User;
};
