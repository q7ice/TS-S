const jwt = 'jwt';
class CookieService {
  static setToken(ctx, value) {
    ctx.cookies.set(jwt, value);
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
