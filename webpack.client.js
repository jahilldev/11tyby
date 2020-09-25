const glob = require('glob');
const path = require('path');
const AssetsManifestPlugin = require('webpack-assets-manifest');

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const RELEASE = !process.argv.includes('--watch');

/* -----------------------------------
 *
 * SASS
 *
 * -------------------------------- */

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      fiber: false,
      data: '@import "template";',
      outputStyle: 'compressed',
      sourceMap: false,
      includePaths: ['./src/styles'],
    },
  },
};

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

module.exports = {
  mode: RELEASE ? 'production' : 'development',
  entry: glob.sync(__dirname + '/src/entry/*.entry.ts*').reduce(getEntryFile, {}),
  context: path.join(__dirname, '/src/'),
  cache: true,
  target: 'web',
  output: {
    path: path.join(__dirname, '/src/_js/assets'),
    filename: RELEASE ? '[name].[chunkhash:8].js' : '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, `./src/`),
    },
  },
  plugins: [
    new AssetsManifestPlugin({
      output: '../assets.json',
      merge: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                target: 'es5',
              },
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              importLoaders: 2,
              sourceMap: false,
            },
          },
          sassLoader,
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:6]',
              },
              importLoaders: 2,
              sourceMap: false,
            },
          },
          sassLoader,
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

/* -----------------------------------
 *
 * Entry
 *
 * -------------------------------- */

function getEntryFile(result, file) {
  const name = path.basename(file, path.extname(file));

  result[name] = file;

  return result;
}
