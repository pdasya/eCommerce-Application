const plugins = [
  './node_modules/prettier-plugin-multiline-arrays/dist/index.js',
];

const pluginsConfigs = {
  'prettier-plugin-multiline-arrays': {
    multilineArraysWrapThreshold: 2,
  },
};

const prettierNativeConfig = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  trailingComma: 'all',
  bracketSameLine: true,
  printWidth: 100,
  endOfLine: 'lf',
};

const pluginsConfigConcat = () =>
  Object.values(pluginsConfigs).reduce(
    (result, current) => ({
      ...result,
      ...current,
    }),
    {},
  );

module.exports = {
  plugins,
  ...prettierNativeConfig,
  ...pluginsConfigConcat(),
};
