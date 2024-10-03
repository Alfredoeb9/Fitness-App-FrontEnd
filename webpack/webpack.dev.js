const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  plugins: [
    new Dotenv({
      path: path.resolve(process.cwd(), ".env.dev"),
      safe: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "../build"),
    },
    liveReload: true,
    hot: false,
    compress: true,
    port: 3002,
    host: "localhost",
    historyApiFallback: true,
  },
});
