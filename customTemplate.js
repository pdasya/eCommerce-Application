module.exports = (dts, { classes }) =>
  Object.keys(classes)
    .map(key => `export const ${key}: string`)
    .join('\n');
