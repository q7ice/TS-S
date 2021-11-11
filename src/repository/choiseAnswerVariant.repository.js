const { Op } = require('sequelize');
const {
  ChoiceAnswerVariant,
} = require('./models');

class ChoiceAnswerVariantRepository {
  static async createBulk(choiceAnswerVariants) {
    const data = await ChoiceAnswerVariant.bulkCreate(choiceAnswerVariants);
    return data
      ?.map(({ dataValues }) => dataValues)
      ?.map(({ id }) => id);
  }

  static async findAll(questionIds) {
    const questionVariants = questionIds.map((id) => ({ QuestionId: id }));
    const response = await ChoiceAnswerVariant.findAll({
      where: {
        [Op.or]: questionVariants,
      },
    });
    const result = response?.map((item) => item.dataValues)
      ?.map(({
        id, value, isTrue, QuestionId,
      }) => ({
        id, value, isTrue, QuestionId,
      }));
    return result;
  }
}

module.exports = {
  ChoiceAnswerVariantRepository,
};
