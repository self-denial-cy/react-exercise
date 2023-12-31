module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 0
  }
};
