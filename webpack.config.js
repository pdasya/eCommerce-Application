const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devTool = devMode ? 'inline-source-map' : undefined;
const distFolder = 'dist';
const srcImageFolder = path.resolve(__dirname, './src/images');
const distImageFolder = path.resolve(__dirname, `./${distFolder}/images`);

const devServer = { static: path.resolve(__dirname, './dist'), historyApiFallback: true };

const styleHandler = devMode
  ? 'style-loader'
  : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        defaultExport: true,
      },
    };

const cssLoaderWithModules = {
  loader: 'css-loader',
  options: {
    modules: true,
  },
};

const cssLoaderNoModules = {
  loader: 'css-loader',
  options: {
    modules: false,
  },
};

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  mode: mode,
  devtool: devTool,
  devServer: devMode ? devServer : undefined,
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [
          styleHandler,
          cssLoaderNoModules,
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/i,
        include: /\.module\.css$/i,
        use: [
          styleHandler,
          cssLoaderWithModules,
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          styleHandler,
          cssLoaderNoModules,
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: /\.module\.s[ac]ss$/i,
        use: [
          styleHandler,
          cssLoaderWithModules,
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
  output: {
    path: path.resolve(__dirname, `./${distFolder}`),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, './public/favicon.png'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: srcImageFolder,
          to: distImageFolder,
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
