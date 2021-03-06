module.exports = module.exports = api => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = ["transform-class-properties"];

  return { presets, plugins };
};