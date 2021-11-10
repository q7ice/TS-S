const { TestRepository } = require('../repository/test.repository');
const { QuestionRepository } = require('../repository/question.repository');
const { TextAnswerVariantRepository } = require('../repository/textAnswerVariant.repository');
const { ChoiceAnswerVariantRepository } = require('../repository/choiseAnswerVariant.repository');

class TestService {
  static async destroy(UserId, TestId) {
    const test = await TestRepository.getOneTest(TestId);
    if (test.UserId === UserId) {
      await TestRepository.destroy(TestId);
    } else {
      throw new Error('У вас нет доступа к этому тесту');
    }
  }

  static async edit(UserId, TestId, name, questions) {
    const test = await TestRepository.getOneTest(TestId);
    if (test.UserId === UserId) {
      await TestRepository.destroy(TestId);
      await TestRepository.createWithId(name, UserId, TestId);

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
    } else {
      throw new Error('У вас нет доступа к этому тесту');
    }
  }

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

  static async getAll(UserId) {
    const result = await TestRepository.getAllByUserId(UserId);
    return result.sort((a, b) => a.id - b.id);
  }

  static async getOne(TestId, UserId) {
    const test = await TestRepository.getOneTest(TestId);
    if (test.UserId === UserId) {
      const questions = await QuestionRepository.getQuestionsByTestId(TestId);
      const mapperForId = (item) => item.id;
      const textFilter = (question) => question.type === 'text';
      const choiceFilter = (question) => question.type === 'single' || question.type === 'multi';
      const questionTextIds = questions.filter(textFilter).map(mapperForId);
      const questionChoiceIds = questions.filter(choiceFilter).map(mapperForId);
      const textAnswerVariants = await TextAnswerVariantRepository.findAll(questionTextIds);
      const choiceAnswerVariants = await ChoiceAnswerVariantRepository.findAll(questionChoiceIds);

      const textQuestions = questions
        .filter(textFilter)
        .map((question) => ({
          ...question,
          answers: textAnswerVariants
            .filter((answer) => answer.QuestionId === question.id)
            .map(({ id, value }) => ({ id, value })),
        }));
      const choiceQuestions = questions
        .filter(choiceFilter)
        .map((question) => ({
          ...question,
          answers: choiceAnswerVariants
            .filter((answer) => answer.QuestionId === question.id)
            .map(({ id, value, isTrue }) => ({ id, value, isTrue })),
        }));
      const result = {
        name: test.name,
        questions: [...textQuestions, ...choiceQuestions],
      };

      return result;
    }
    throw new Error('У вас нет доступа к этому тесту');
  }
}

module.exports = {
  TestService,
};
