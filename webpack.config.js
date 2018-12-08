var webpack = require('webpack')
var path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      },

      // Font awesome loader.
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.posix.join(
            'path/to/yours/assets/directory',
            'fonts/[name].[hash:7].[ext]'
          )
        }
      }
    ]
  },
  vue: {
    loaders: {
      // ...

      // Css loader for Webpack 1.x .
      css: 'vue-style-loader!css-loader'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}
