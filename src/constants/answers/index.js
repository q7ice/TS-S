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
      name: 'Смена имени прошла успешно',
      status: 'Смена статуса прошла успешно',
      avatar: 'Смена аватара прошла успешно',
      email: 'Смена email прошла успешно',
      password: 'Смена пароля прошла',
    },
  },
  error: {
    unavailableEmail: 'Данный email недоступен',
    incorrectCredentials: 'Неправильный логин или пароль',
    impossiblePassword: 'Невозможный пароль',
    impossibleEmail: 'Невозможный email',
    tokenIsUnset: 'Токен не установлен',
  },
};

module.exports = {
  answers,
};
