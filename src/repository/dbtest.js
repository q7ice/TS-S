const { sequelize } = require('./models');
const { UserRepository } = require('./user.repository');
const { TestRepository } = require('./test.repository');
const { TestService } = require('../services/test.service');

const testData = {
  name: 'Тест по HTML',
  questions: [{
    id: 1,
    type: 'text',
    description: 'Описание вопроса',
    cost: 1,
    answers: [{ value: 'Не знаю', isTrue: true }],
  },
  {
    id: 2,
    type: 'single',
    description: '2+2',
    cost: 1,
    answers: [{ value: '3', id: 1, isTrue: false }, { value: '4', id: 2, isTrue: true }],
  }],
};

async function init() {
  const UserId = await UserRepository.register('test@mail.ru', '123123');
  await TestService.create(UserId, testData.name, testData.questions);
}

async function run() {
  // await init();
  await TestService.getOne(1);
}

run().catch().finally(async () => await sequelize.close());
