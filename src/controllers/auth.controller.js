const { answers } = require('../constants/answers');
const { AuthService } = require('../services/auth.service');
const { CookieService } = require('../services/cookie.service');
const { TokenService } = require('../services/token.service');

class AuthController {
  static async registration(ctx) {
    const { email, password } = ctx.request.body;
    await AuthService.register(email, password);
    ctx.body = { message: answers.success.registration };
  }

  static async validate(ctx) {
    const { userId } = ctx.request;
    if (!userId) {
      CookieService.clearToken(ctx);
      ctx.body = { error: answers.error.tokenIsUnset };
    } else {
      const { token, id, role } = await AuthService.refreshToken(userId);
      CookieService.setToken(ctx, token);
      ctx.body = {
        message: answers.success.login,
        body: {
          id,
          role,
        },
      };
    }
  }

  static async login(ctx) {
    const { email, password } = ctx.request.body;
    const { id, role, token } = await AuthService.login(email, password);
    CookieService.setToken(ctx, token);
    ctx.body = {
      message: answers.success.login,
      body: {
        id,
        role,
      },
    };
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
