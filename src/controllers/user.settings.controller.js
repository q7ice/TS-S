const { userService } = require('../services/user.service');
const { answers } = require('../constants/answers');

class UserSettingsController {
  static async changeName(ctx) {
    const { name } = ctx.request.body;
    const { userId } = ctx.request;
    await userService.changeName(userId, name);
    ctx.body = { message: answers.success.change.name };
  }

  static async changeEmail(ctx) {
    const { email } = ctx.request.body;
    const { userId } = ctx.request;
    await userService.changeEmail(userId, email);
    ctx.body = { message: answers.success.change.email };
  }

  static async changePassword(ctx) {
    const { password } = ctx.request.body;
    const { userId } = ctx.request;
    await userService.changePassword(userId, password);
    ctx.body = { message: answers.success.change.password };
  }

  static async getPersonalData(ctx) {
    const { userId } = ctx.request;
    ctx.body = await userService.getPersonalData(userId);
  }
}

module.exports = { UserSettingsController };
