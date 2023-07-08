const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    reservations: './src/reservationModal/reservations.js',
    header: './src/home/header.js',
    footer: './src/home/footer.js',
    home: './src/home/home.js',
    getShows: './src/home/getShows.js',
    pullMoviesData: './src/reservationModal/pullMovies.js',
    fetchReservations: './src/reservationModal/fetchReservations.js',
    postReservation: './src/reservationModal/postReservation.js',
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
