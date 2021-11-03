class CookieService {
  static #tokenField = 'jwt'

  static setToken(ctx, value) {
    ctx.cookies.set(CookieService.#tokenField, value);
  }

  static getToken(ctx) {
    return ctx.cookies.get(CookieService.#tokenField);
  }

  static clearToken(ctx) {
    ctx.cookies.set(CookieService.#tokenField, '');
  }
}

module.exports = {
  CookieService,
};
