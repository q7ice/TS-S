const { parseToken } = require('../services/token.service');
const { CookieService } = require('../services/cookie.service');

async function tokenValidationMiddleware(ctx, next) {
  const token = CookieService.getToken(ctx);
  const { userId } = parseToken(token);
  if (token) {
    ctx.request.userId = userId;
    await next();
  } else {
    throw new Error('Invalid token');
  }
}

module.exports = {
  tokenValidation: tokenValidationMiddleware,
};
