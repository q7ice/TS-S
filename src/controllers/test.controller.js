const { answers } = require('../constants/answers');
const { TestService } = require('../services/test.service');

class TestController {
  static async destroyTest(ctx) {
    const { userId } = ctx.request;
    const { testId } = ctx.request.body;
    const response = await TestService.destroy(userId, testId);
    ctx.body = response;
  }

  static async getAll(ctx) {
    const { userId } = ctx.request;
    const response = await TestService.getAll(userId);
    ctx.body = response;
  }

  static async getOne(ctx) {
    const { testId } = ctx.request.body;
    const { userId } = ctx.request;
    const test = await TestService.getOne(testId, userId);
    ctx.body = {
      message: 'Успех!',
      body: {
        ...test,
      },
    };
  }

  static async createTest(ctx) {
    const { name, questions } = ctx.request.body;
    const { userId } = ctx.request;
    await TestService.create(userId, name, questions);
    ctx.body = { message: answers.success.create.test };
  }

  static async editTest(ctx) {
    const { testId, name, questions } = ctx.request.body;
    const { userId } = ctx.request;
    await TestService.edit(userId, testId, name, questions);
    ctx.body = { message: answers.success.edit.test };
  }
}

module.exports = {
  TestController,
};
