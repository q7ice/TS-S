const { RecipeRepository } = require('../repository/test.repository');

class TestService {
  static async create(name, questions) {
    await RecipeRepository.createRecipe(name, questions);
  }

  static async getAll() {
    return await RecipeRepository.getRecipes();
  }
}

module.exports = {
  RecipeService: TestService,
};
