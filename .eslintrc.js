module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-unused-vars': 'off',
    'no-return-await': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
  },
};
