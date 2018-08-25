const glob = require('glob');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const extractSCSS = new ExtractTextWebpackPlugin('css/main.css');

const entries = glob.sync('./src/**/*.pug');

module.exports = {
  mode: 'development',
  entry: [
    './src/js/main.js',
    './src/css/main.scss',
  ].concat(entries),
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dst')
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].html',
              context: 'src/html'
            }
          },
          'extract-loader',
          'html-loader',
          'pug-html-loader',
        ]
      },
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
