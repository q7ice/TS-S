const { Op } = require('sequelize');
const { ChoiceAnswer } = require('./models');

class ChoiceAnswerRepository {
  static async deleteAll(choiceAnswerIds) {
    const answers = choiceAnswerIds.map((id) => ({ ChoiceAnswerVariantId: id }));
    await ChoiceAnswer.destroy({
      where: {
        [Op.or]: answers,
      },
    });
  }

  static async createBulk(choiceAnswers) {
    const data = await ChoiceAnswer.bulkCreate(choiceAnswers);
    return data
      ?.map(({ dataValues }) => dataValues)
      ?.map(({ id }) => id);
  }

  static async findAll(questionIds) {
    const answers = questionIds.map((id) => ({ ChoiceAnswerVariantId: id }));
    const response = await ChoiceAnswer.findAll({
      where: {
        [Op.or]: answers,
      },
    });
    const result = response
      ?.map((item) => item.dataValues)
      ?.map(({ id, isTrue, ChoiceAnswerVariantId }) => ({ id, isTrue, ChoiceAnswerVariantId }));
    return result;
  }
}

module.exports = {
  ChoiceAnswerRepository,
};
