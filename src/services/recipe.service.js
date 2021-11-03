const { RecipeRepository } = require('../repository/recipe.repository');

class RecipeService {
  static async create(userId, title, imagePath, description, ingredients, directions) {
    await RecipeRepository.createRecipe(userId, title, imagePath, description, ingredients, directions);
  }

  static async getAll() {
    return await RecipeRepository.getRecipes();
  }
}

module.exports = {
  RecipeService,
};
