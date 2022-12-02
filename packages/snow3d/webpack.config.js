const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
// const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

// Issue is here: https://github.com/webpack/webpack/issues/3497#issuecomment-331463800
const rules = defaultConfig.module.rules.filter((rule) => !'any.png'.match(rule.test));

module.exports = {
  ...defaultConfig,
  entry: './src/main.ts',
  module: {
    ...defaultConfig.module,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        resourceQuery: /inline/,
        test: /\.(bmp|png|jpe?g|gif)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.glsl$/,
        use: 'webpack-glsl-loader',
      },
      ...rules,
    ],
  },

  resolve: {
    ...defaultConfig.resolve,
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },

  // plugins: [new StatoscopeWebpackPlugin(), ...defaultConfig.plugins],

  output: {
    ...defaultConfig.output,
    filename: 'snow3d.js',
    path: path.resolve(__dirname, 'build'),
  },
};
