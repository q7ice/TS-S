const { answers } = require('../constants/answers');
const { AuthService } = require('../services/auth.service');
const { AdminService } = require('../services/admin.service');

class AdminController {
  static async blockUser(ctx) {
    const { blockId } = ctx.request.body;
    const { userId } = ctx.request;
    if (blockId === userId) {
      throw new Error('Нельзя заблокировать самого себя!');
    } else {
      await AdminService.blockUser(blockId);
    }
    ctx.body = { message: 'Пользователь был успешно заблокирован' };
  }
}

module.exports = {
  AdminController,
};
