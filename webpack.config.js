const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    reservations: './src/reservations.js',
    header: './src/header.js',
    footer: './src/footer.js',
    home: './src/home.js',
    getShows: './src/getShows.js',
    pullMoviesData: './src/pullMovies.js',
    postResevations: './src/postReservations.js',
    fetchReservations: './src/fetchReservations.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'media-library',
              publicPath: 'media-library',
            },
          },
        ],
      },
    ],
  },
    optimization: {
        runtimeChunk: 'single',
    },
};
