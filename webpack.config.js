require('babel-polyfill');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: add autoprefixer

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
          'css-loader',
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
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
