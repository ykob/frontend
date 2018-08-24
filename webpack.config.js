const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const extractSCSS = new ExtractText('css/main.css');

module.exports = {
  mode: 'development',
  entry: [
    './src/js/main.js',
    './src/css/main.scss',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dst')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  postcssPresetEnv()
                ]
              }
            },
            'sass-loader'
          ]
        })
      },
    ]
  },
  plugins: [
    extractSCSS,
  ],
};
