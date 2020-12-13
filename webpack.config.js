const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/app.js',
  },
  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].js',
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(__dirname, 'static/js/bundles'),
    // `publicPath` is where Webpack will load your bundles from (optional)
    publicPath: path.resolve(__dirname, 'static/js/bundles')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({openAnalyzer: false})
  ]
};
