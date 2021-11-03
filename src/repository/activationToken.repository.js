const { ActivationToken } = require('../../models');

class ActivationTokenRepository {
  static async add(userId, token) {
    await ActivationToken.create({ userId, token });
  }

  static async delete(token) {
    await ActivationToken.destroy({ where: { token } });
  }
}

module.exports = {
  ActivationTokenRepository,
};
