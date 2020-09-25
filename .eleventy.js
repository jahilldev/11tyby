const { isValidElement } = require('preact');
const { render } = require('preact-render-to-string');

/* -----------------------------------
 *
 * 11ty
 *
 * -------------------------------- */

module.exports = function (config) {
  config.addPassthroughCopy('./src/_js/assets');

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  });

  config.setUseGitIgnore(false);

  config.addTransform('transform-jsx', (content) => {
    if (isValidElement(content)) {
      return render(content);
    }

    return content;
  });

  config.addTransform('transform-hash', (content, path) => {
    if (path.endsWith('.html')) {
      return transformFileHash(content);
    }

    return content;
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src/_js',
      output: 'dist',
      layouts: 'layouts',
      includes: '_includes',
    },
  };
};

/* -----------------------------------
 *
 * Hashes
 *
 * -------------------------------- */

function transformFileHash(content) {
  const assets = require('./src/_js/assets.json');
  const keys = Object.keys(assets);

  return keys.reduce((result, key) => {
    return result.replace(key, assets[key]);
  }, content);
}
