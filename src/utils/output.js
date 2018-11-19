const fs = require('fs-extra');
const path = require('path');

const yaml = require('js-yaml');
const envfile = require('envfile');
const flatten = require('flat');

const fileTypes = require('../fileTypes');

/**
 * Output one files by extensions
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object} data - data object
 * @param {string[]} extensions - file extensions
 * @param {Object=} options - output options
 */
module.exports.extensions = async (dirname, fileRoot, data, extensions = [], options = {}) => {
  if (extensions.length === 0) extensions = [fileTypes.json,];
  await Promise.all(extensions.map(async extension => {
    await this.extension(dirname, fileRoot, data, extension, options);
  }));
};
/**
 * Output one file by extension
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object} data - data object
 * @param {string} extension - file extension
 * @param {Object=} options - output options
 */
module.exports.extension = async (dirname, fileRoot, data, extension, options = {}) => {
  switch (extension) {
    case fileTypes.json:
      return await this.json(dirname, fileRoot, data, options);
    case fileTypes.js:
      return await this.js(dirname, fileRoot, data, options);
    case fileTypes.env:
      return await this.env(dirname, fileRoot, data, options);
    case fileTypes.yml:
      return await this.yml(dirname, fileRoot, data, options);
    default:
      return console.error(`[${this.extension}]: invalid file type`);
  }
};

/**
 * Output json file
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object} data - data object
 * @param {Object=} options - output options
 * @param {string|number=} [options.spacing=2] - Define the number of spaces or \t
 */
module.exports.json = async (dirname, fileRoot, data, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.json`);

    let spacing = 2; // default spacing
    if (options.spacing) {
      if (typeof options.spacing === 'number') {
        spacing = options.spacing;
      }
      if (options.spacing === '\t') {
        spacing = options.spacing;
      }
    }

    const formattedData = JSON.stringify(data, null, spacing);

    await fs.outputFile(filePath, formattedData);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Output js file
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object} data - data object
 * @param {Object=} options - output options
 * @param {string|number=} [options.spacing=2] - number of spaces or \t
 */
module.exports.js = async (dirname, fileRoot, data, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.js`);

    let spacing = 2; // default spacing
    if (options.spacing) {
      if (typeof options.spacing === 'number') {
        spacing = options.spacing;
      }
      if (options.spacing === '\t') {
        spacing = options.spacing;
      }
    }

    const formattedData = `module.exports = ${JSON.stringify(
      data,
      null,
      spacing
    )}`;

    await fs.outputFile(filePath, formattedData);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Output env file
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object} data - data object
 * @param {Object=} options - output options
 */
module.exports.env = async (dirname, fileRoot, data, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.env`);

    let formattedData = flatten(data);
    formattedData = await new Promise((resolve, reject) => {
      envfile.stringify(formattedData, (err, str) => {
        if (err) reject(err);
        resolve(str);
      });
    });

    await fs.outputFile(filePath, formattedData);

  } catch (error) {
    console.error(error);
  }
};

/**
 * Output yaml file
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object} data - data object
 * @param {Object=} options - output options
 * @param {number=} [options.spacing=2] - number of spaces
 */
module.exports.yml = async (dirname, fileRoot, data, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.yml`);

    // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
    const sortKeys = function (a, b) {
      const keyA = a.toLowerCase();
      const keyB = b.toLowerCase();
      if (keyA < keyB) //sort string ascending
        return -1;
      if (keyA > keyB) return 1;
      /* istanbul ignore next line */
      return 0; //default return value (no sorting)
    };

    let spacing = 2; // default spacing
    if (options.spacing) {
      if (typeof options.spacing === 'number') {
        spacing = options.spacing;
      }
    }

    const formattedData = yaml.safeDump(data, {
      indent: spacing,
      skipInvalid: true,
      schema: yaml.JSON_SCHEMA,
      sortKeys,
    });

    await fs.outputFile(filePath, formattedData);
  } catch (error) {
    console.error(error);
  }
};
