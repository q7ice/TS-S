const answers = {
  success: {
    registration: 'Registration was successful',
    login: 'Login was successful',
    activation: 'Activation was successful',
    logout: 'Logout was successful',
    create: {
      recipe: 'Creating recipe was successful',
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
  },
};

module.exports = {
  answers,
};
