module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  extends: ['plugin:@typescript-eslint/recommended', 'standard', 'prettier'],
  env: {
    jest: true,
    node: true
  },
  rules: {
    'tsdoc/syntax': 'error',
<<<<<<< HEAD
    'node/no-deprecated-api': ['warn'],
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'error',
    'no-explicit-any': 'off',
    'no-console': 'off',
    // '@typescript-eslint/no-unused-vars': ['worning', { argsIgnorePattern: '^_' }],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['warn'],
    '@typescript-eslint/no-inferrable-types': ['off'],
    '@typescript-eslint/no-var-requires': ['warn'],
    camelcase: ['warn']
=======

    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'error',

    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/no-inferrable-types': ['off']
>>>>>>> 418b1c14d37cf36ecca24a60a7a6b05f27d69d93
  }
}
