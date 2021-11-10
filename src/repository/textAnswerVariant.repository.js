const { Op } = require('sequelize');
const { TextAnswerVariant } = require('./models');

class TextAnswerVariantRepository {
  static async createBulk(textAnswerVariants) {
    const data = await TextAnswerVariant.bulkCreate(textAnswerVariants);
    return data?.map(({ dataValues }) => dataValues)
      ?.map(({ id }) => id);
  }

  static async findAll(questionIds) {
    const questionVariants = questionIds.map((id) => ({ QuestionId: id }));
    const response = await TextAnswerVariant.findAll({
      where: {
        [Op.or]: questionVariants,
      },
    });
    const result = response?.map((item) => item.dataValues)
      ?.map(({ id, value, QuestionId }) => ({ id, value, QuestionId }));
    return result;
  }
}

module.exports = {
  TextAnswerVariantRepository,
};
