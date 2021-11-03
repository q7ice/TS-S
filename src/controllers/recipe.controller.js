const { createRecipeService, RecipeService } = require('../services/recipe.service');
const { answers } = require('../constants/answers');

class RecipeController {
  static async createRecipe(ctx) {
    const {
      title, description, ingredients, directions,
    } = ctx.request.body;
    const { userId } = ctx.request;
    const imagePath = ctx.file?.path;
    await createRecipeService(userId, title, imagePath, description, ingredients, directions);
    ctx.body = { message: answers.success.create.recipe };
  }

  static async getRecipes(ctx) {
    const recipes = await RecipeService.getAll();
    ctx.body = { recipes };
  }
}
module.exports = {
  RecipeController,
};
