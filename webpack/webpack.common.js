const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('../package.json').dependencies
const pkgname = require('../package.json').name

module.exports = {
  entry: [
    'core-js/modules/es.array.iterator',
    'core-js/stable/symbol',
    'core-js/stable/object',
    './src/index.tsx',
  ],
  output: {
    publicPath: 'auto',
    path: path.join(__dirname, '../build'),
  },
  target: ['browserslist'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    /*
      Micro services
      name: pkgname,
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './test/<expose name>':
          './src/components/<Main Component>',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        }
      }

    */
    new ModuleFederationPlugin({
      name: pkgname,
      shared: {
        ...deps,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './src/assets/fav/draccon.ico'
    }),
  ],
}