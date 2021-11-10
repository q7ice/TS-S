const { TestService } = require('./test.service');

// eslint-disable-next-line
test('Create a new test', () => {
  TestService.create(1, 'Тест по математике', [{
    type: 'text',
    description: '2+2?',
    cost: 1,
    answers: [{ value: '4', isTrue: true }],
  }]);
});
