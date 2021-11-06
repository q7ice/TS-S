const { TestRepository } = require('../repository/test.repository');
const { QuestionRepository } = require('../repository/question.repository');
const { TextAnswerVariantRepository } = require('../repository/textAnswerVariant.repository');
const { ChoiceAnswerVariantRepository } = require('../repository/choiseAnswerVariant.repository');

class TestService {
  static async create(UserId, name, questions) {
    const TestId = await TestRepository.create(name, UserId);

    const preparedQuestions = questions.map((question) => ({
      type: question.type,
      description: question.description,
      cost: question.cost,
      TestId,
    }));

    const QuestionIds = await QuestionRepository.createBulk(preparedQuestions);

    const tempAnswers = questions
      .map((question, index) => {
        const result = question.answers
          .map((answer) => ({
            ...answer,
            QuestionId: QuestionIds[index],
            type: question.type,
          }));
        return result;
      });

    const preparedAnswers = [];
    tempAnswers.forEach((answers) => answers.forEach((answer) => preparedAnswers.push(answer)));

    const answerMapper = ({ value, isTrue, QuestionId }) => ({ value, isTrue, QuestionId });
    const preparedTextAnswerVariants = preparedAnswers
      .filter((answer) => (answer.type === 'text'))
      .map(answerMapper);
    const preparedChoiceAnswerVariants = preparedAnswers
      .filter((answer) => answer.type === 'single' || answer.type === 'multi')
      .map(answerMapper);

    await TextAnswerVariantRepository
      .createBulk(preparedTextAnswerVariants);
    await ChoiceAnswerVariantRepository
      .createBulk(preparedChoiceAnswerVariants);
  }

  static async getAll() {
  }
}

module.exports = {
  TestService,
};
