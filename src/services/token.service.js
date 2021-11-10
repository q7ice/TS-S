const jwt = require('jsonwebtoken');
const { auth } = require('../constants/auth');

class TokenService {
  static parse(token) {
    if (token) {
      try {
        return jwt.verify(token, auth.SECRET_KEY);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static generate(userId, userRole) {
    const dataForToken = { userId, userRole };
    return jwt.sign(dataForToken, auth.SECRET_KEY, { expiresIn: '30d' });
  }
}

module.exports = {
  TokenService,
};
