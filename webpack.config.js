const path = require('path')

module.exports = {
  entry: {
    'front-end': './front-end/js/index.js',
    'back-end': './back-end/js/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        loader: 'buble-loader',
        options: {
          jsx: 'React.h',
          objectAssign: 'Object.assign'
        }
      }
    ]
  }
}
