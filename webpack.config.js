const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "production",
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/favicon.png",
      meta: {
        description:
          "Streamline your coding workflow with AI-generated assistance in refactoring, debugging, and language conversion, all within a user-friendly interface for an efficient coding experience.",
        keywords:
          "ai code generation, ai text generation, ai coding assistance, coding assistant, code explanations",
        author: "Aniqa",
        "og:type": "website",
        "og:title": "Your AI coding assistant",
        "og:description":
          "Streamline your coding workflow with AI-generated assistance in refactoring, debugging, and language conversion, all within a user-friendly interface for an efficient coding experience.",
        "og:url": "https://code.aniqa.dev",
        "og:image": "https://code.aniqa.dev/screenshot.png",
        "twitter:title": "Your AI coding assistant",
        "twitter:card": "summary_large_image",
        "twitter:image": "https://code.aniqa.dev/screenshot.png",
        "twitter:image:alt": "Screen capture of website's user interface",
        "twitter:site": "@aniqatc",
      },
    }),
    new MiniCssExtractPlugin(),
    ...(isDevelopment
      ? [new Dotenv()]
      : [
          new webpack.DefinePlugin({
            "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
          }),
        ]),
    new CopyPlugin({
      patterns: [
        { from: "src/styles/download.css", to: "download.css" },
        { from: "src/assets/screenshot.png", to: "screenshot.png" },
      ],
    }),
    new WebpackPwaManifest({
      name: "AI Code Assistance Chat",
      short_name: "AI Coding Chat",
      description:
        "Get assistance for coding-related tasks through a simple, easy-to-use and feature-rich chat application.",
      theme_color: "#18181B",
      background_color: "#B3B3E0",
      display: "standalone",
      start_url: "/",
      crossorigin: "use-credentials",
      icons: [
        {
          src: path.resolve(__dirname, "src/assets/favicon.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("icons"),
          filename: "icon-[size].png",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
