const { UserRepository } = require('../repository/user.repository');
const { PasswordService } = require('./password.service');
const { createUploadLink } = require('../helpers/auth/createUploadLink');

class UserService {
  async changeName(id, name) {
    await UserRepository.changeName(id, name);
  }

  async changeStatus(id, status) {
    await UserRepository.changeStatus(id, status);
  }

  async changeAvatar(id, path) {
    await UserRepository.changeAvatarUrl(id, path);
  }

  async changeEmail(id, email) {
    await UserRepository.changeEmail(id, email);
  }

  async changePassword(id, password) {
    const hashPassword = PasswordService.getHash(password);
    await UserRepository.changePassword(id, hashPassword);
  }

  async getPersonalData(id) {
    let {
      name, status, avatarUrl, email,
    } = await UserRepository.getUserDataById(id);
    avatarUrl = createUploadLink(avatarUrl);
    return {
      name, status, avatarUrl, email,
    };
  }
}

module.exports = {
  userService: new UserService(),
};
