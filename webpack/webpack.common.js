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
    alias: {
      "@": path.resolve(__dirname, "../src"), // Alias for src directory
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', {
                  corejs: { version: 3 },
                  useBuiltIns: 'usage',
                  targets: {
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1',
                  },
                }],
                ['@babel/preset-react', { 
                  runtime: 'automatic' 
                }],
                ['@babel/preset-typescript', {
                  isTSX: true,
                  allExtensions: true,
                }],
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
                ['@babel/plugin-transform-runtime'],
              ],
            },
          }
        ]

      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', {
                  corejs: { version: 3 },
                  useBuiltIns: 'usage',
                  targets: {
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1',
                  },
                }],
                ['@babel/preset-react', { 
                  runtime: 'automatic' 
                }],
              ],
            },
          },
        ],
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
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets/images/",
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
