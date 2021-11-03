const bcrypt = require('bcrypt');

class PasswordService {
  static getHash(password) {
    return bcrypt.hashSync(password, 10);
  }

  static compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

module.exports = {
  PasswordService,
};
