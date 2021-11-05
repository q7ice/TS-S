const { answers } = require('../constants/answers');
const { AuthService } = require('../services/auth.service');
const { CookieService } = require('../services/cookie.service');

class AuthController {
  static async registration(ctx) {
    const { email, password } = ctx.request.body;
    await AuthService.register(email, password);
    ctx.body = { message: answers.success.registration };
  }

  static async login(ctx) {
    const { email, password } = ctx.request.body;
    const token = await AuthService.login(email, password);
    CookieService.setToken(ctx, token);
    ctx.body = { message: answers.success.login };
  }

  static async logout(ctx) {
    CookieService.clearToken(ctx);
    ctx.body = { message: answers.success.logout };
  }

  static async isAvailableEmail(ctx) {
    const { email } = ctx.request.body;
    const result = await AuthService.isAvailableEmail(email);
    ctx.body = result;
  }
}

module.exports = {
  AuthController,
};
