const { Question } = require('./models');

class QuestionRepository {
  static async create(TestId, description, cost) {
    const questionData = {
      description,
      cost,
      TestId,
    };
    const { dataValues: question } = await Question.create(questionData);
    return question.id;
  }

  static async createBulk(questions) {
    const data = await Question.bulkCreate(questions);
    return data?.map(({ dataValues }) => dataValues)
      ?.map(({ id }) => id);
  }
}

module.exports = {
  QuestionRepository,
};
