const { isValidElement } = require('preact');
const { render } = require('preact-render-to-string');

/* -----------------------------------
 *
 * 11ty
 *
 * -------------------------------- */

module.exports = function (config) {
  config.addPassthroughCopy('./src/_js/assets');
  config.addPassthroughCopy('./src/_js/articles/_images');

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  });

  config.setUseGitIgnore(false);

  config.addTransform('jsx', (content) => {
    if (isValidElement(content)) {
      return `<!doctype html>${render(content)}`;
    }

    return content;
  });

  config.addTransform('hash', (content, path) => {
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

  return keys.reduce(
    (result, key) =>
      result.replace(
        new RegExp(`(script|link)(.*)(src|href)="(.*)${key}"`, 'g'),
        `$1$2$3="$4${assets[key]}"`
      ),
    content
  );
}
