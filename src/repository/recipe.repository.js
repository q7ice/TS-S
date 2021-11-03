const { Recipe } = require('../../models');

class RecipeRepository {
  static async createRecipe(userId, title, imagePath, description, ingredients, directions) {
    console.log(userId, title, imagePath, description, ingredients, directions);
    await Recipe.create({
      userId,
      title,
      imagePath,
      description,
      ingredients,
      directions,
    });
  }

  static async getRecipes() {
    const response = await Recipe.findAll();
    const mapper = ({ dataValues: item }) => {
      const {
        id, userId, title, imagePath, description, ingredients, directions,
      } = item;
      return {
        id, userId, title, imagePath, description, ingredients, directions,
      };
    };
    return response.map(mapper);
  }
}

module.exports = {
  RecipeRepository,
};
