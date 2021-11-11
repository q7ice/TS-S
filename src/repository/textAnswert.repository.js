const { Op } = require('sequelize');
const { TextAnswer } = require('./models');

class TextAnswerRepository {
  static async deleteAll(textAnswerIds) {
    const answers = textAnswerIds.map((id) => ({ QuestionId: id }));
    await TextAnswer.destroy({
      where: {
        [Op.or]: answers,
      },
    });
  }

  static async createBulk(textAnswers) {
    const data = await TextAnswer.bulkCreate(textAnswers);
    return data?.map(({ dataValues }) => dataValues)
      ?.map(({ id }) => id);
  }

  static async findAll(questionIds) {
    const questions = questionIds.map((id) => ({ QuestionId: id }));
    const response = await TextAnswer.findAll({
      where: {
        [Op.or]: questions,
      },
    });
    const result = response?.map((item) => item.dataValues)
      ?.map(({ id, value, QuestionId }) => ({ id, value, QuestionId }));
    return result;
  }
}

module.exports = {
  TextAnswerRepository,
};
