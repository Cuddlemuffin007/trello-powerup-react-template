/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dev = process.env.NODE_ENV !== "production";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

module.exports = (env: any) => {
    return {
        output: {
            path: resolveApp("dist"),
            filename: "powerup-[name].js",
            library: "react",
            clean: true,
        },
        entry: {
            capabilities: resolveApp(path.join("src", "capabilities.ts")),
            addon: resolveApp(path.join("src", "addon.tsx")),
        },
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: "handlebars-loader",
                },
                {
                    test: /\.tsx?$/,
                    loader: "babel-loader",
                    exclude: [/(node_modules)/],
                    options: {
                        cacheDirectory: true,
                        plugins: [dev && require.resolve("react-refresh/babel")].filter(Boolean),
                    },
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: "url-loader",
                    options: { limit: 100000 },
                },
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre",
                    exclude: [/(node_modules)/],
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                url: {
                                    filter: (url: string) => !url.startsWith("data:"),
                                },
                            },
                        },
                    ],
                },
            ],
        },
        devtool: !env.WEBPACK_BUILD ? "source-map" : undefined,
        plugins: [
            new webpack.EnvironmentPlugin([
                "CONTEXT_PATH",
                "NODE_ENV",
                "POWERUP_NAME",
                "POWERUP_APP_KEY",
                "TRELLO_TOKEN_EXPIRATION",
            ]),
            new CopyWebpackPlugin({ patterns: [{ from: "static", to: "static" }] }),
            // new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                chunks: ["capabilities"],
                template: "templates/index.hbs",
                filename: "index.html",
                templateParameters: { powerup_name: process.env.POWERUP_NAME },
            }),
            new HtmlWebpackPlugin({
                chunks: ["addon"],
                template: "templates/react.hbs",
                filename: "card-button.html",
                templateParameters: {
                    powerup_name: process.env.POWERUP_NAME,
                    powerup_app_key: process.env.POWERUP_APP_KEY,
                },
            }),
            new HtmlWebpackPlugin({
                chunks: ["addon"],
                template: "templates/react.hbs",
                filename: "auth.html",
                templateParameters: {
                    powerup_name: process.env.POWERUP_NAME,
                    powerup_app_key: process.env.POWERUP_APP_KEY,
                },
            }),
            !env.WEBPACK_BUILD && new webpack.HotModuleReplacementPlugin(),
            !env.WEBPACK_BUILD && new ReactRefreshWebpackPlugin(),
        ].filter(Boolean),
        optimization: !env.WEBPACK_BUILD
            ? {
                  minimize: true,
                  usedExports: "global",
                  splitChunks: {
                      chunks: "async",
                      minSize: 50000,
                      maxSize: 244000,
                      minChunks: 1,
                      maxAsyncRequests: 30,
                      maxInitialRequests: 30,
                      cacheGroups: {
                          defaultVendors: {
                              test: /[\\/]node_modules[\\/]/,
                              priority: -10,
                              reuseExistingChunk: true,
                          },
                          default: {
                              minChunks: 2,
                              priority: -20,
                              reuseExistingChunk: true,
                          },
                      },
                  },
              }
            : undefined,
        resolve: { extensions: [".ts", ".tsx", ".js", ".css"] },
        mode: env.WEBPACK_BUILD ? "production" : "development",
    };
};
