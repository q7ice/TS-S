const { Test } = require('./models');

class TestRepository {
  static async createTest(name, questions) {
    // create
  }

  static async getTests() {
    const response = await Test.findAll();
    return response.map(response?.dataValues);
  }
}

module.exports = {
  RecipeRepository: TestRepository,
};
