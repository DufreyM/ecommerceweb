module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['standard', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    semi: ['error', 'never'], // ❌ sin punto y coma
    quotes: ['error', 'single'], // ✅ comillas simples
    indent: ['error', 2], // ✅ 2 espacios
    'space-before-function-paren': ['error', 'always']
  }
}
