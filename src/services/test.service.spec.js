const { TestService } = require('./test.service');
const { AuthService } = require('./auth.service');

// eslint-disable-next-line
test('Create a new test', async () => {
  const userId1 = await AuthService.register('test1@mail.com', '123123');
});
