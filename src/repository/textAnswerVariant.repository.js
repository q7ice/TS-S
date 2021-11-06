const { TextAnswerVariant } = require('./models');

class TextAnswerVariantRepository {
  static async createBulk(textAnswerVariants) {
    const data = await TextAnswerVariant.bulkCreate(textAnswerVariants);
    return data?.map(({ dataValues }) => dataValues)
      ?.map(({ id }) => id);
  }

  static async getTests() {
  }
}

module.exports = {
  TextAnswerVariantRepository,
};
