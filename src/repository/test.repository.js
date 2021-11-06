const { Test } = require('./models');

class TestRepository {
  static async create(name, UserId) {
    const { dataValues: test } = await Test.create({ name, UserId });
    return test.id;
  }

  static async getTests() {
    const response = await Test.findAll();
    console.log(response.map(response?.dataValues));
    return response.map(response?.dataValues);
  }
}

module.exports = {
  TestRepository,
};
