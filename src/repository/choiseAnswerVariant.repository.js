const { ChoiceAnswerVariant } = require('./models');

class ChoiceAnswerVariantRepository {
  static async createBulk(choiceAnswerVariants) {
    const data = await ChoiceAnswerVariant.bulkCreate(choiceAnswerVariants);
    return data
      ?.map(({ dataValues }) => dataValues)
      ?.map(({ id }) => id);
  }

  static async getTests() {
  }
}

module.exports = {
  ChoiceAnswerVariantRepository,
};
