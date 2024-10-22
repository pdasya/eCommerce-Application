module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'prettier',
    'import',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ['src/**/*.slice.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'no-debugger': 'warn',
    'no-console': 'warn',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-nested-ternary': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.{test,spec}.{ts,tsx}', '**/*.test-util.{ts,tsx}'] },
    ],
    curly: 'error',
  },
  noInlineConfig: false,
};
