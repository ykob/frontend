const glob = require('glob');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const entries = [
    './src/js/main.js',
    './src/css/main.scss',
  ].concat(
    glob.sync('./src/**/*.pug'),
    glob.sync('./src/*(img|font|json)/**/*.*')
  );

module.exports = {
  entry: entries,
  plugins: [
    new CleanWebpackPlugin('dst')
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dst')
  },
  module: {
    rules: [
      // Build HTML with Pug.
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].html',
              context: 'src/html',
            }
          },
          'extract-loader',
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              doctype: 'html',
              pretty: true,
              data: {
                text: 'data text'
              }
            }
          }
        ]
      },
      // Build CSS with SCSS.
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].css',
              context: 'src',
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
      // Build JavaScript with Babel.
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
      // Compress images.
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
              outputPath: ''
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
      },
      // Only copy some files.
      {
        test: /\.(ico|woff|woff2|eot|ttf|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
              outputPath: ''
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
};
