const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { ModuleFederationPlugin } = require("webpack").container;
// const deps = require("../package.json").dependencies;
// const pkgname = require("../package.json").name;
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: [
    "core-js/modules/es.array.iterator",
    "core-js/stable/symbol",
    "core-js/stable/object",
    "./src/index.tsx",
  ],
  output: {
    publicPath: "/",
    path: path.join(__dirname, "../build"),
  },
  target: ["browserslist"],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["src", "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
        type: "asset/resource",
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
    // new ModuleFederationPlugin({
    //   name: pkgname,
    //   shared: {
    //     ...deps,
    //   },
    // }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // favicon: './src/assets/fav/draccon.ico'
    }),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};
