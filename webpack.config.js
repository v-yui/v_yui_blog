const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/main.html'),
      filename: 'index.html',
      showErrors: true,
      inject: 'head',
      chunks: ['main']
    })
  ],
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            // 用 img-loader 压缩图片
            loader: "img-loader",
            options: {
              plugins: [//给图片资源加载配置插件
                require('imagemin-pngquant')({//用于图片压缩的imagemin-pngquant，还有一个隐式调用的加载器imagemin-loader
                  quality: [0.1, 0.3]//图片压缩30%~50%
                })
              ]
            }
          },
          {
            // 用 url-loader 处理图片
            loader: "url-loader",
            options: {
              name: "[name].[hash:16].[ext]", // 文件名.hash.文件扩展名 默认格式为[hash].[ext]，没有文件名
              limit: 1024 * 8, // 将小于8KB的图片转换成base64的格式
              outputPath: "imgs"
            }
          }
        ]
      },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
};