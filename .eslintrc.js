module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    camelcase: 0,
    'no-use-before-define': 0,
    'func-names': 0,
    'global-require': 0,
    'no-mixed-operators': 0,
    'no-unused-vars': 0,
    'no-eval': 0,
    'no-restricted-syntax': 0,
    'no-prototype-builtins': 0,
    'class-methods-use-this': 0,
  },
};
