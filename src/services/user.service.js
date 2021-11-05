const { UserRepository } = require('../repository/user.repository');
const { PasswordService } = require('./password.service');

class UserService {
  static async changeName(id, name) {
    await UserRepository.changeName(id, name);
  }

  static async changeEmail(id, email) {
    await UserRepository.changeEmail(id, email);
  }

  static async changePassword(id, password) {
    const hashPassword = PasswordService.getHash(password);
    await UserRepository.changePassword(id, hashPassword);
  }

  static async getPersonalData(id) {
    const { name, theme } = await UserRepository.getUserDataById(id);
    return { name, theme };
  }
}

module.exports = {
  userService: UserService,
};
