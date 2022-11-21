// webpack configuration that will be shared in both development and production environments

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // devtool: 'inline-nosources-cheap-module-source-map',
  module: {
    rules: [
      {
        // webpack should use babel loader for all .js, .jsx, .ts, and .tsx files, excluding the node_modules folder
        test: /\.(ts|js)x?$/,
        // include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // these filetypes are included as part of webpack 5, so no need to use external loaders
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './public'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(
      {template: path.resolve(__dirname, '..', './public/index.html'),}
    ),
  ],
  stats: 'errors-only',
  cache: false
}