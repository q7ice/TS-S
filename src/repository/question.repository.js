const { Question } = require('./models');

class QuestionRepository {
  static async create(TestId, description, cost, type) {
    const questionData = {
      description,
      cost,
      type,
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

  static async getQuestionsByTestId(TestId) {
    const response = await Question.findAll({
      where: {
        TestId,
      },
    });

    const mapper = (question) => ({
      id: question?.dataValues?.id,
      description: question?.dataValues?.description,
      cost: question?.dataValues?.cost,
      type: question?.dataValues?.type,
    });
    return response
      ?.map(mapper)
      ?.sort((a, b) => a.id - b.id);
  }
}

module.exports = {
  QuestionRepository,
};
