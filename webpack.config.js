const glob = require('glob');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');

const entries = [
    './src/js/main.js',
    './src/css/main.scss',
  ].concat(
    glob.sync('./src/**/*.pug'),
    glob.sync('./src/img/**/*.*')
  );

module.exports = {
  mode: 'development',
  entry: entries,
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].css',
              context: 'src'
            }
          },
          'extract-loader',
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
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 90
              },
              pngquant: {
                quality: '80-90',
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 90
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dst'),
    compress: true,
    open: true,
    openPage: '',
    port: 3000,
    watchContentBase: true,
  },
  plugins: [
  ],
};
