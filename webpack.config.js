module.exports = {
  entry: './src/main.js',
  output: {
    filename: './dest/bundle.js'
  }
};

module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }
  ]
}