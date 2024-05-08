module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'prettier',
    'import',
    '@typescript-eslint',
    'unicorn',
    '@shopify',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@cspell/recommended',
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
      // Overrides only for redux toolkit slices
      files: ['src/**/*.slice.ts'],
      rules: {
        /**
         * Due to `createSlice` use the Immer library to enable
         * writing immutable updates using "mutating" JS syntax
         **/
        'no-param-reassign': ['error', { props: false }],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^(action)$',
          },
        ],
        /**
         * Because type inference works well in this case and allows
         * us to write more readable code without redundant typing
         *
         * Note from official docs: Instead of enabling typedef, it is generally
         * recommended to use the --noImplicitAny and --strictPropertyInitialization
         * compiler options to enforce type annotations only when useful.
         *
         * So maybe we need to disable this rule for the entire codebase.
         * For now, we’ll try this, and if there are problems,
         * we’ll turn it off for the entire project.
         */
        '@typescript-eslint/typedef': [
          'error',
          {
            parameter: false,
          },
        ],
      },
    },
  ],
  rules: {
    'import/extensions': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'no-debugger': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreParameters: true, ignoreProperties: true },
    ],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      {
        enforce: [
          { blankLine: 'always', prev: '*', next: 'method' },
          { blankLine: 'never', prev: 'field', next: 'field' },
        ],
      },
    ],
    '@cspell/spellchecker': [
      'warn',
      {
        // Automatically fix common mistakes (only possible if a single preferred suggestion is available)
        autoFix: false,
        // Number of spelling suggestions to make
        numSuggestions: 1,
        // Generate suggestions
        generateSuggestions: false,
        // Ignore import and require names
        ignoreImports: true,
        // Ignore the properties of imported variables, structures, and types
        ignoreImportProperties: true,
        // Spell check identifiers (variables names, function names, and class names)
        checkIdentifiers: true,
        // Spell check strings
        checkStrings: true,
        // Spell check template strings
        checkStringTemplates: true,
        // Spell check JSX Text
        checkJSXText: false,
        // Spell check comments
        checkComments: true,
        // Path to a custom word list file (better setup in .cspell.json)
        customWordListFile: '',
        // Output debug logs
        debugMode: false,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      // Class naming: "PascalCase"
      {
        selector: ['class'],
        format: ['StrictPascalCase'],
      },
      // Class properties (public/protected): "camelCase"
      {
        selector: ['classProperty'],
        modifiers: ['public'],
        format: ['strictCamelCase'],
      },
      {
        selector: ['classProperty'],
        modifiers: ['protected'],
        format: ['strictCamelCase'],
      },
      // Class properties (private): underscore-prefixed "camelCase"
      {
        selector: [
          'property',
          'parameterProperty',
          'accessor',
        ],
        modifiers: ['private'],
        prefix: ['_'],
        format: ['strictCamelCase'],
      },
      // Class methods: "camelCase"
      {
        selector: ['classMethod'],
        format: ['strictCamelCase'],
      },
      // Parameters and arguments: "camelCase"
      {
        selector: ['parameter'],
        format: ['strictCamelCase'],
      },
      // Interfaces: prefix "I"
      {
        selector: ['interface'],
        prefix: ['I'],
        format: ['StrictPascalCase'],
      },
      // Variables: "camelCase"
      {
        selector: ['variable'],
        format: ['strictCamelCase'],
      },
      // Constants: "camelCase"
      {
        selector: ['variable'],
        format: ['strictCamelCase', 'StrictPascalCase'],
        types: ['function'],
      },
    ],
    // Class fields: explicit member accessibility
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
        },
      },
    ],
    // Mandatory typing of function/method arguments
    '@typescript-eslint/typedef': [
      'error',
      {
        parameter: true,
      },
    ],
    // Do not use abbreviations in naming entities and files
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          Params: true,
        },
      },
    ],
    // Singular-naming components of an interface name
    'prefer-singular-interfaces': 'off',
    // Singular-naming components of an enum name
    '@shopify/typescript/prefer-singular-enums': 'error',
    // Each class must be defined in a separate file
    'max-classes-per-file': [
      'error',
      1,
    ],
    // Mandatory typing of the return value of functions/methods
    '@typescript-eslint/explicit-function-return-type': 'error',
    // Don't use simplified if/else/while constructs
    curly: 'error',
    // No directive comments
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': true,
        'ts-check': true,
        'ts-expect-error': true,
        'ts-nocheck': true,
      },
    ],
    // No inline array elements (except if only one or two elements)
    'array-element-newline': [
      'error',
      {
        ArrayExpression: { minItems: 1 },
        ArrayPattern: { minItems: 3 },
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
      },
    ],
    // Dangling comma everywhere
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    // Functions and methods lines limit
    'max-lines-per-function': [
      'error',
      { max: 40, skipBlankLines: true, skipComments: true },
    ],
    // Prevent using of "magic" numbers
    'no-magic-numbers': ['error', { ignore: [1] }],
  },
  // Allow disabling rules in code
  noInlineConfig: false,
};
