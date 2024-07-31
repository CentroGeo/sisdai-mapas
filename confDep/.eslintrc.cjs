/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: ['html'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-new': 0,
    eqeqeq: 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  globals: {
    globalThis: 'readonly',
  },
}
