const { TokenService } = require('../services/token.service');
const { CookieService } = require('../services/cookie.service');

async function tokenValidation(ctx, next) {
  const token = CookieService.getToken(ctx);
  if (token) {
    const { userId } = TokenService.parse(token);
    ctx.request.userId = userId;
    await next();
  } else {
    throw new Error('Invalid token');
  }
}

module.exports = {
  tokenValidation,
};
