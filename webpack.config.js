require('babel-polyfill');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'source-map',
  devServer: {  // TODO:热加载很慢需要解决
    // hot: true,
    host: '0.0.0.0',
    port: '9420',
    // compress: true,
  },
  mode: 'production',
  entry: './src/entry',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.(jpg|png)$/, loader: 'url?limit=8192' },
      {
        test: /\.(c|sc|sa)ss$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2 } },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [
                postcssPresetEnv(),
                // require('postcss-import')(),
                autoprefixer()
              ]
            },
          },
          'sass-loader'
        ]
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['.jsx', '.wasm', '.mjs', '.js', '.json']
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: "[id].css"
    })
  ]
};
