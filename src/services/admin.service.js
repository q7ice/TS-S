const { UserRepository } = require('../repository/user.repository');
const { roles } = require('../constants/permissions/roles');

class AdminService {
  static async blockUser(blockId, userId) {
    const userExist = await UserRepository.isExist(blockId);
    if (userExist) {
      const userRole = await UserRepository.getUserRoleById(blockId);
      if (userRole === roles.BLOCK) {
        throw new Error('Пользователь уже заблокирован!');
      } else if (userRole) {
        await UserRepository.block(blockId);
      }
    } else {
      throw new Error('Польльзователя с таким ID не существует!');
    }
  }
}

module.exports = {
  AdminService,
};
