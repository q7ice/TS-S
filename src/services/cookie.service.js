const jwt = 'jwt';
class CookieService {
  static setToken(ctx, value) {
    ctx.cookies.set(jwt, value, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  static getToken(ctx) {
    return ctx.cookies.get(jwt);
  }

  static clearToken(ctx) {
    ctx.cookies.set(jwt, '');
  }
}

module.exports = {
  CookieService,
};
