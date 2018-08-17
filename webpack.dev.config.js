require('babel-polyfill');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const Visualizer = require('webpack-visualizer-plugin'); // remove it in production environment.
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // remove it in production environment.
const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
  new Visualizer(), // remove it in production environment.
  new BundleAnalyzerPlugin({
    defaultSizes: 'parsed',
    // generateStatsFile: true,
    statsOptions: { source: false }
  }), // remove it in production environment.
];

module.exports = {
  devtool: 'source-map',
  devServer: {  // TODO:热加载很慢需要解决
    // hot: true,
    host: '0.0.0.0',
    port: '9420',
    // compress: true,
  },
  mode: 'development',
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
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(c|sc|sa)ss$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules')
        ],
        // exclude: /node_modules/,
        use: [
          'style-loader',
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
    }),
    ...otherPlugins
  ]
};
