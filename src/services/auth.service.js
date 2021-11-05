const { UserRepository } = require('../repository/user.repository');
const { PasswordService } = require('./password.service');
const { TokenService } = require('./token.service');
const { answers } = require('../constants/answers');

class AuthService {
  static async register(email, password) {
    const emailCheck = await UserRepository.isAvailableEmail(email);
    if (emailCheck) {
      const passwordHash = PasswordService.getHash(password);
      await UserRepository.register(email, passwordHash);
    } else {
      throw Error(answers.error.unavailableEmail);
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

  static async isAvailableEmail(email = '') {
    return await UserRepository.isAvailableEmail(email);
  }
}

module.exports = {
  AuthService,
};
