const { TestRepository } = require('../repository/test.repository');
const { QuestionRepository } = require('../repository/question.repository');
const { TextAnswerVariantRepository } = require('../repository/textAnswerVariant.repository');
const { ChoiceAnswerVariantRepository } = require('../repository/choiseAnswerVariant.repository');
const { ChoiceAnswerRepository } = require('../repository/choiceAnswer.repository');
const { TextAnswerRepository } = require('../repository/textAnswert.repository');

class TestService {
  static async getResults(UserId, TestId) {
    const mapperId = (item) => item.id;
    const textFilter = (question) => question.type === 'text';
    const choiceFilter = (question) => question.type === 'single' || question.type === 'multi';
    const test = await TestRepository.getOneTest(TestId);
    const questions = await QuestionRepository.getQuestionsByTestId(TestId);

    const textQuestionIds = questions.filter(textFilter).map(mapperId);
    const choiceQuestionIds = questions.filter(choiceFilter).map(mapperId);

    const userTextAnswers = await TextAnswerRepository
      .findAll(textQuestionIds);
    const realTextAnswers = await TextAnswerVariantRepository
      .findAll(textQuestionIds);

    const realChoiceAnswers = await ChoiceAnswerVariantRepository
      .findAll(choiceQuestionIds);

    const choiceVariantIds = realChoiceAnswers.map(mapperId);

    const userChoiceAnswers = await ChoiceAnswerRepository
      .findAll(choiceVariantIds);

    if (userTextAnswers.length === 0 && userChoiceAnswers.length === 0) {
      throw new Error('У вас нет ответов на этот тест');
    }

    const textResults = realTextAnswers.map((realAnswer) => {
      const findOne = (answer) => answer.QuestionId === realAnswer.QuestionId;
      const userAnswer = userTextAnswers.filter(findOne)[0];
      return {
        id: userAnswer.QuestionId,
        value: userAnswer.value,
        realValue: realAnswer.value,
        QuestionId: realAnswer.QuestionId,
      };
    });

    const choiceResults = realChoiceAnswers.map((realAnswer) => {
      const findOne = (answer) => answer.ChoiceAnswerVariantId === realAnswer.id;
      const userAnswer = userChoiceAnswers.filter(findOne)[0];
      return {
        id: userAnswer?.ChoiceAnswerVariantId,
        value: realAnswer.value,
        userIsTrue: userAnswer?.isTrue,
        realIsTrue: realAnswer.isTrue,
        QuestionId: realAnswer.QuestionId,
      };
    });

    const textQuestions = questions
      .filter(textFilter)
      .map((question) => {
        const textResult = textResults.filter((res) => res.QuestionId === question.id)[0];
        return {
          ...question,
          answers: [textResult],
        };
      });

    const choiceQuestions = questions
      .filter(choiceFilter)
      .map((question) => {
        const choiceResult = choiceResults.filter((res) => res.QuestionId === question.id);
        return {
          ...question,
          answers: choiceResult,
        };
      });

    return {
      name: test.name,
      questions: [...textQuestions, ...choiceQuestions],
    };
  }

  static async saveAnswers(UserId, TestAnswers) {
    const textFilter = (question) => question.type === 'text';
    const choiceFilter = (question) => question.type === 'single' || question.type === 'multi';

    const textAnswers = TestAnswers
      .filter(textFilter)
      .map((question) => ({
        QuestionId: question.id,
        value: question.answers[0].value,
        UserId,
      }));

    const choiceAnswers = TestAnswers
      .filter(choiceFilter)
      .map((question) => (question.answers))
      .flat(Infinity)
      .map((answer) => ({
        ChoiceAnswerVariantId: answer.id,
        isTrue: answer.isTrue,
        UserId,
      }));

    const deleteTextAnswerIds = textAnswers.map((answer) => answer.QuestionId);
    const deleteChoiceAnswerIds = choiceAnswers.map((answer) => answer.ChoiceAnswerVariantId);

    await TextAnswerRepository.deleteAll(deleteTextAnswerIds);
    await ChoiceAnswerRepository.deleteAll(deleteChoiceAnswerIds);

    const TextAnswerIds = await TextAnswerRepository.createBulk(textAnswers);
    const ChoiceAnswerIds = await ChoiceAnswerRepository.createBulk(choiceAnswers);
  }

  static async changeOpenTest(UserId, TestId) {
    const test = await TestRepository.getOneTest(TestId);
    if (test.UserId === UserId) {
      await TestRepository.changeOpenTest(TestId);
    } else {
      throw new Error('У вас нет доступа к этому тесту');
    }
  }

  static async takeTest(TestId) {
    const test = await TestRepository.getOneTest(TestId);
    if (test.isOpen) {
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
            .map(({ id }) => ({ id, value: '' })),
        }));
      const choiceQuestions = questions
        .filter(choiceFilter)
        .map((question) => ({
          ...question,
          answers: choiceAnswerVariants
            .filter((answer) => answer.QuestionId === question.id)
            .map(({ id, value }) => ({ id, value, isTrue: false })),
        }));
      const result = {
        name: test.name,
        questions: [...textQuestions, ...choiceQuestions],
      };
      return result;
    }
    throw new Error('У вас нет доступа к этому тесту');
  }

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
    return TestId;
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
