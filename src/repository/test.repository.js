const { Test } = require('./models');

class TestRepository {
  static async create(name, UserId) {
    const test = await Test.create({ name, UserId });
    return test?.dataValues?.id;
  }

  static async createWithId(name, UserId, id) {
    const test = await Test.create({ name, UserId, id });
    return test?.dataValues?.id;
  }

  static async destroy(TestId) {
    await Test.destroy({ where: { id: TestId } });
  }

  static async getAllByUserId(UserId) {
    const response = await Test.findAll({
      where: {
        UserId,
      },
    });
    const mapper = (test) => ({
      id: test?.dataValues?.id,
      name: test?.dataValues?.name,
      isOpen: test?.dataValues?.isOpen,
      createdAt: test?.dataValues?.createdAt,
    });
    return response?.map(mapper);
  }

  static async getTestByTestId(TestId) {
    console.log('TestId', TestId);
    const response = await Test.findOne({
      where: {
        id: TestId,
      },
    });
    const data = response?.dataValues;
    return {
      id: data.id,
      name: data.name,
      isOpen: data.isOpen,
      createdAt: data.createdAt,
    };
  }

  static async getOneTest(TestId) {
    const response = await Test.findOne({
      where: {
        id: TestId,
      },
    });
    const data = response?.dataValues;
    return {
      id: data.id,
      name: data.name,
      isOpen: data.isOpen,
      createdAt: data.createdAt,
      UserId: data.UserId,
    };
  }
}

module.exports = {
  TestRepository,
};
