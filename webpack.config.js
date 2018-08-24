const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');

const extractSCSS = new ExtractText('css/main.css');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
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
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    extractSCSS,
  ],
};
