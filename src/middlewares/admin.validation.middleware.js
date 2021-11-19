const { CookieService } = require('../services/cookie.service');
const { TokenService } = require('../services/token.service');
const { UserRepository } = require('../repository/user.repository');
const { roles } = require('../constants/permissions/roles');

async function adminValidation(ctx, next) {
  const token = CookieService.getToken(ctx);
  if (token) {
    const { userId } = TokenService.parse(token);
    const role = await UserRepository.getUserRoleById(userId);
    if (role === roles.ADMIN) {
      ctx.request.userId = userId;
      await next();
    } else {
      throw new Error('У вас нет прав администратора');
    }
  } else {
    throw new Error('Invalid token');
  }
}

module.exports = {
  adminValidation,
};
