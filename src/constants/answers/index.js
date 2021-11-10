const answers = {
  success: {
    registration: 'Регистрация прошла успешно',
    login: 'Вход прошёл успешно',
    activation: 'Активация прошла успешно',
    logout: 'Выход прошёл успешно',
    create: {
      test: 'Создание теста прошло успешно',
    },
    edit: {
      test: 'Изменение теста прошло успешно',
    },
    change: {
      name: 'Changing name was successfully',
      status: 'Changing status was successfully',
      avatar: 'Changing avatar was successfully',
      email: 'Changing email was successfully',
      password: 'Changing password was successfully',
    },
  },
  error: {
    unavailableEmail: 'Unavailable email',
    incorrectCredentials: 'Incorrect email or password',
    impossiblePassword: 'Impossible password',
    impossibleEmail: 'Impossible email',
    tokenIsUnset: 'Токен не установлен',
  },
};

module.exports = {
  answers,
};
