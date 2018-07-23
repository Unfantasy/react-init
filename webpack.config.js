require('babel-polyfill');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const devMode = false;
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'source-map',
  devServer: {  // TODO:热加载很慢需要解决
    // hot: true,
    host: '0.0.0.0',
    port: '9420',
    // compress: true,
  },
  mode: 'development',
  // mode: 'production',
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
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules')
        ],
        // exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2 } },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv(),
                // require('postcss-import')(),
                autoprefixer('last 2 versions')
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
  // optimization: {
  //   runtimeChunk: {
  //     name: "index"
  //   },
  //   // splitChunks: {
  //   //   cacheGroups: {
  //   //     commons: {
  //   //       test: /[\\/]node_modules[\\/]/,
  //   //       name: "vendor",
  //   //       chunks: "all"
  //   //     }
  //   //   }
  //   // }
  // },
  
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'index.css',
    })
  ]
};
