const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { argv } = require('yargs');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AssetsManifestPlugin = require('webpack-assets-manifest');
const TerserPlugin = require('terser-webpack-plugin');

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const MODE = argv.mode || 'development';
const RELEASE = argv.mode === 'production';

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
 * Data
 *
 * -------------------------------- */

const data = {
  mode: MODE,
  entry: getDataFiles(),
  context: path.join(__dirname, '/src/'),
  cache: true,
  target: 'node',
  externals: fs.readdirSync('node_modules'),
  output: {
    path: path.join(__dirname, '/src/_js'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, `./src/`),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'data',
          to: 'data',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/*.ts'],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
  watchOptions: {
    aggregateTimeout: 500,
  },
};

/* -----------------------------------
 *
 * Pages
 *
 * -------------------------------- */

const pages = {
  mode: MODE,
  entry: glob.sync(`${__dirname}/src/**/*.11ty.ts*`).reduce(getSourceFile, {}),
  context: path.join(__dirname, '/src/'),
  cache: true,
  target: 'node',
  externals: fs.readdirSync('node_modules'),
  output: {
    path: path.join(__dirname, '/src/_js'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, `./src/`),
    },
  },
  plugins: [
    new ExtractCssPlugin({
      filename: RELEASE ? 'assets/[name].[contenthash:8].css' : 'assets/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'modules/articles',
          to: 'articles',
          globOptions: {
            ignore: ['**/*.ts*', '**/*.scss'],
          },
        },
      ],
    }),
    new AssetsManifestPlugin({
      output: 'assets.json',
      merge: true,
      customize: (asset) => {
        const [key] = asset.key.split('assets/').slice(-1);
        const [value] = asset.value.split('assets/').slice(-1);

        if (value.endsWith('.11ty.js')) {
          return false;
        }

        return { key, value };
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          ExtractCssPlugin.loader,
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
          ExtractCssPlugin.loader,
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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:8].[ext]',
              outputPath: '/assets',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
  watchOptions: {
    aggregateTimeout: 500,
  },
};

/* -----------------------------------
 *
 * Entry
 *
 * -------------------------------- */

const entry = {
  mode: MODE,
  entry: glob.sync(`${__dirname}/src/modules/**/*.entry.ts*`).reduce(getSourceFile, {}),
  context: path.join(__dirname, '/src/'),
  cache: true,
  target: 'web',
  output: {
    path: path.join(__dirname, '/src/_js/assets'),
    filename: RELEASE ? '[name].[chunkhash:8].js' : '[name].js',
    publicPath: '/assets/',
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
                module: 'esnext',
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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    mergeDuplicateChunks: true,
    moduleIds: 'deterministic',
    runtimeChunk: false,
    splitChunks: {
      name: false,
      chunks: 'async',
      cacheGroups: {
        default: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: splitVendorChunks,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  watchOptions: {
    aggregateTimeout: 500,
  },
};

/* -----------------------------------
 *
 * Data
 *
 * -------------------------------- */

function getDataFiles() {
  const globalData = glob.sync(`${__dirname}/src/data/*.ts`).reduce(getSourceFile, {});
  const moduleData = glob.sync(`${__dirname}/src/**/*.data.ts`).reduce(getSourceFile, {});

  return { ...globalData, ...moduleData };
}

/* -----------------------------------
 *
 * Source
 *
 * -------------------------------- */

function getSourceFile(result, file) {
  let [name] = file.split('src/').slice(-1);

  if (file.includes('modules/')) {
    [name] = file.split('modules/').slice(-1);
  }

  result[name.replace(/\.tsx?$/g, '')] = file;

  return result;
}

/* -----------------------------------
 *
 * Vendor
 *
 * -------------------------------- */

function splitVendorChunks(module, chunks) {
  const chunkNames = chunks.filter(({ name }) => !(name || '').endsWith('.entry'));

  if (chunkNames.length) {
    return chunkNames[0].name;
  }

  return 'vendor';
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = [data, pages, entry];
