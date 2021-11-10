const { roles } = require('../constants/permissions/roles');
const { User } = require('./models');

class UserRepository {
  static async register(email, password, userRole = roles.USER) {
    const { dataValues: user } = await User.create({
      email,
      password,
      userRole,
    });
    return user.id;
  }

  static async isAvailableEmail(email) {
    const result = await User.findOne({ where: { email } });
    return !result;
  }

  static async searchUserByEmail(email) {
    const result = await User.findOne({ where: { email } });
    return result?.dataValues;
  }

  static async activateUser(link) {
    const user = await User.findOne({ where: { activationLink: link } });
    if (user) {
      user.isActivated = true;
      user.activationLink = null;
      await user.save();
    }
  }

  static async getUserRoleById(UserId) {
    const user = await User.findOne({ where: { id: UserId } });
    return user?.dataValues?.role;
  }

  static async changeName(userId, name) {
    await User.update({ name }, { where: { id: userId } });
  }

  static async changeEmail(userId, email) {
    await User.update({ email }, { where: { id: userId } });
  }

  static async changePassword(userId, password) {
    await User.update({ password }, { where: { id: userId } });
  }

  static async getUserDataById(id) {
    const result = await User.findOne({ where: { id } });
    return result?.dataValues;
  }
}

module.exports = {
  UserRepository,
};
