const { UserRepository } = require('../repository/user.repository');
const { ActivationService } = require('./activation.service');
const { PasswordService } = require('./password.service');
const { TokenService } = require('./token.service');
const { answers } = require('../constants/answers');

class AuthService {
  static async register(email, password) {
    const emailCheck = await UserRepository.isAvailableEmail(email);
    if (emailCheck) {
      const passwordHash = PasswordService.getHash(password);
      const user = await UserRepository.register(email, passwordHash);
      await ActivationService.addUser(user.id);
    } else {
      throw Error(answers.unavailableEmail);
    }
  }

  static async login(email, password) {
    const user = await UserRepository.searchUserByEmail(email);
    const allowedAccess = user && PasswordService.compare(password, user.password);
    if (allowedAccess) {
      return TokenService.generate(user.id);
    }
    throw Error(answers.error.incorrectCredentials);
  }

  static async activate(link) {
    await UserRepository.activateUser(link);
  }

  static async isAvailableEmail(email = '') {
    return await UserRepository.isAvailableEmail(email);
  }
}

module.exports = {
  AuthService,
};
