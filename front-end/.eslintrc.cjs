module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@vue/eslint-config-airbnb-with-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue-scoped-css/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint', 'vue-scoped-css'],
  rules: {
    'vue/no-mutating-props': [
      'error',
      {
        shallowOnly: true
      }
    ],
    'vue/no-multiple-template-root': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off'
  }
};
