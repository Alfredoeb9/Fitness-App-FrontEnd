const path = require('path')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.resolve(process.cwd(), '.env.production'),
      safe: true,
    }),
  ],
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})