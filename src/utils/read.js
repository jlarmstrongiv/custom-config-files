const fs = require('fs-extra');
const path = require('path');

const fg = require('fast-glob');
const yaml = require('js-yaml');
const unflatten = require('flat').unflatten;
const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

const fileTypes = require('../fileTypes');

/**
 * Find and read one file
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {string[]} extensions - file extensions
 * @param {Object=} options - parse options
 */
module.exports.findOne = async (dirname, fileRoot, extensions = [], options = {}) => {
  try {
    let extensionsString = '(json|js|yml|yaml|env)';
    if (extensions.length === 1) extensionsString = extensions[0];
    if (extensions.length > 1) extensionsString = `(${extensions.join('|')})`;

    const entries = await fg(`${dirname}/.${fileRoot}.${extensionsString}`);

    if (entries.length === 0) return null;
    if (entries.length === 1) {
      const entry = entries[0];
      const extension = path.extname(entry).substring(1);
      return await this.extension(dirname, fileRoot, extension);
    }
    if (entries.length > 1) {
      const entryStats = await Promise.all(entries.map(async (entry) => {
        const stat = await fs.stat(entry);
        return {
          stat,
          entry,
        };
      }));
      const entryStat = entryStats.reduce((newestFile, file) => (newestFile.stat.mtimeMs > file.stat.mtime) ? newestFile : file);
      const extension = path.extname(entryStat.entry).substring(1);
      return await this.extension(dirname, fileRoot, extension);
    }
  } catch (error) {
    /* istanbul ignore next line */
    console.error(error);
  }
};

/**
 * Find one file by extension
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {string} extension - file extension
 * @param {Object=} options - parse options
 */
module.exports.extension = async (dirname, fileRoot, extension, options = {}) => {
  switch (extension) {
    case fileTypes.json:
      return await this.json(dirname, fileRoot);
    case fileTypes.js:
      return await this.js(dirname, fileRoot);
    case fileTypes.env:
      return await this.env(dirname, fileRoot);
    case fileTypes.yml:
      return await this.yml(dirname, fileRoot);
    default:
      return console.error(`[${this.extension}]: invalid file type`);
  }
};

/**
 * Read json file
 * Parse options - github.com/jprichardson/node-jsonfile#readfilefilename-options-callback
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object=} options - parse options
 */
module.exports.json = async (dirname, fileRoot, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.json`);
    const data = await fs.readJson(filePath);
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Read js file
 * Parse options - github.com/jprichardson/node-jsonfile#readfilefilename-options-callback
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object=} options - parse options
 */
module.exports.js = async (dirname, fileRoot, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.js`);
    const data = require(filePath);
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Read env file
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object=} options - parse options
 */
module.exports.env = async (dirname, fileRoot, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.env`);
    let file = await fs.readFile(filePath);

    let data = dotenv.parse(file);
    data = dotenvParseVariables(data);
    data = unflatten(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Read yaml file
 * @param {string} dirname - folder path
 * @param {string} fileRoot - file root name
 * @param {Object=} options - parse options
 */
module.exports.yml = async (dirname, fileRoot, options = {}) => {
  try {
    const filePath = path.join(dirname, `.${fileRoot}.yml`);
    const file = await fs.readFile(filePath, 'utf8');
    const data = yaml.safeLoad(file, {
      filename: filePath,
      schema: yaml.JSON_SCHEMA,
      json: true,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
