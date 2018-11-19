const fs = require('fs-extra');
const path = require('path');

const fg = require('fast-glob');
const fileTypes = require('../fileTypes');

/**
 * Output one files by extensions
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {string} extensions - file extensions
 * @param {Object=} options - remove options
 */
module.exports.extensions = async (dirname, fileRoot, extensions = [], options = {}) => {
  try {
    let extensionsString = '(json|js|yml|yaml|env)';
    if (extensions.length === 1) extensionsString = extensions[0];
    if (extensions.length > 1) extensionsString = `(${extensions.join('|')})`;

    const entries = await fg(`${dirname}/.${fileRoot}.${extensionsString}`);

    if (entries.length === 0) return null;
    if (entries.length > 0) {
      await Promise.all(entries.map(async (entry) => {
        const extension = path.extname(entry).substring(1);
        return await this.extension(dirname, fileRoot, extension, options);
      }));
    }
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
  }
};

/**
 * Find one file by extension
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {string} extension - file extension
 * @param {Object=} options - remove options
 */
module.exports.extension = async (dirname, fileRoot, extension, options = {}) => {
  try {
    switch (extension) {
      case fileTypes.json:
        return await fs.remove(path.join(dirname, `.${fileRoot}.json`));
      case fileTypes.js:
        return await fs.remove(path.join(dirname, `.${fileRoot}.js`));
      case fileTypes.env:
        return await fs.remove(path.join(dirname, `.${fileRoot}.env`));
      case fileTypes.yml:
        return await fs.remove(path.join(dirname, `.${fileRoot}.yml`));
      default:
        return console.error(`[${this.extension}]: invalid file type`);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Remove directory
 * @param {string} dirname - folder path
 */
module.exports.dir = async (dirname, options = {}) => {
  try {
    await fs.remove(dirname);
  } catch (error) {
    /* istanbul ignore next line */
    console.error(error);
  }
};
