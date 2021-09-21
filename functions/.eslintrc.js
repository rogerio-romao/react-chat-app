module.exports = {
  parser: 'babel-eslint',
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
  },
};
