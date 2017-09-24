const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['whatwg-fetch', './js/app.jsx'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
        inline: true,
        contentBase: ".",
        port: 3001
    },
  watch: true,
  module: {
   rules: [
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        query:	{	presets:	[	'es2015',	'stage-2',	'react']	}
      }
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader', "postcss-loader" ]
    },
    {
      test: /\.(woff|woff2|eot|svg|ttf|otf)$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
     test: /\.scss$/,
     use: [ 'style-loader', 'css-loader', "postcss-loader", 'sass-loader' ]
    },
    {
       test: /\.(png|jpe?g|gif|svg|ico)$/,
       use: 'file-loader?name=images/[name].[ext]'
    },
   ]
 },
 plugins: [
    require('autoprefixer'),
    new webpack.SourceMapDevToolPlugin({
    filename: 'bundle.js.map',
    exclude: ['/node_modules/','vendor.js'],
})
 ]
};
