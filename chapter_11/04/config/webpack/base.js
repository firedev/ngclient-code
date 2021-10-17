/***
 * Excerpted from "Modern Front-End Development for Rails",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
***/
const { webpackConfig, merge } = require("@rails/webpacker")
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const customConfig = {
  plugins: [new ForkTSCheckerWebpackPlugin()],
  resolve: {
    extensions: [".css"],
  },
}

module.exports = merge(webpackConfig, customConfig)
