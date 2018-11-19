const output = require('./utils/output');
const read = require('./utils/read');
const remove = require('./utils/remove');

class Config {
  /**
   * @constructor
   * @param {Object} options - config options
   * @param {string} options.fileRoot - fileRoot name
   * @param {string} options.globalDir - user config directory
   * @param {string=} options.localDir - project directory
   */
  constructor(options = {}) {
    // mandatory variables for initialization
    if (!options.globalDir)
      throw new Error('Must define [globalDir] in Config constructor');
    if (!options.fileRoot)
      throw new Error('Must define [fileRoot] in Config constructor');
    // initialize
    this.setFileRoot(options.fileRoot);
    this.setLocalDir(options.localDir || process.cwd());
    this.setGlobalDir(options.globalDir);
  }

  /**
   * Set the instance fileRoot
   * @param {string} newFileRoot - new fileRoot name
   */
  setFileRoot(newFileRoot) {
    this.fileRoot = newFileRoot;
  }
  /**
   * Set the instance localDir
   * @param {string} setLocalDir - new localDir name
   */
  setLocalDir(localDir) {
    this.localDir = localDir;
  }
  /**
   * Set the instance globalDir
   * @param {string} setGlobalDir - new globalDir name
   */
  setGlobalDir(globalDir) {
    this.globalDir = globalDir;
  }

  /**
   * Read the configs
   * Daults to local, global, null
   * @param {string|string[]} extensions - array of extensions
   */
  async read(extensions) {
    if (typeof extensions === 'string') extensions = [extensions,];
    let config = await this.readLocal(extensions);
    if (!config) config = await this.readGlobal(extensions);
    if (!config) config = null;
    return config;
  }
  /**
   * Read the local configs
   * @param {string|string[]} extensions - array of extensions
   */
  async readLocal(extensions) {
    if (typeof extensions === 'string') extensions = [extensions,];
    return await read.findOne(this.localDir, this.fileRoot, extensions) || null;
  }
  /**
   * Read the global configs
   * @param {string|string[]} extensions - array of extensions
   */
  async readGlobal(extensions) {
    if (typeof extensions === 'string') extensions = [extensions,];
    return await read.findOne(this.globalDir, this.fileRoot, extensions) || null;
  }

  /**
   * Output the local configs
   * @param {Object} data - data to output
   * @param {string|string[]} extensions - array of extensions
   * @param {Object=} options - output options
   * @param {string|number=} [options.spacing=2] - Define the number of spaces or \t
   */
  async outputLocal(data = {}, extensions, options) {
    if (typeof extensions === 'string') extensions = [extensions,];
    await output.extensions(this.localDir, this.fileRoot, data, extensions, options);
  }
  /**
   * Output the global configs
   * @param {Object} data - data to output
   * @param {string|string[]} extensions - array of extensions
   * @param {Object=} options - output options
   * @param {string|number=} [options.spacing=2] - Define the number of spaces or \t
   */
  async outputGlobal(data = {}, extensions, options) {
    if (typeof extensions === 'string') extensions = [extensions,];
    await output.extensions(this.globalDir, this.fileRoot, data, extensions, options);
  }

  /**
   * Remove the local configs
   * @param {string|string[]} extensions - array of extensions
   */
  async removeLocal(extensions) {
    if (typeof extensions === 'string') extensions = [extensions,];
    await remove.extensions(this.localDir, this.fileRoot, extensions);
  }
  /**
   * Remove the global configs
   * @param {string|string[]} extensions - array of extensions
   */
  async removeGlobal(extensions) {
    if (typeof extensions === 'string') extensions = [extensions,];
    await remove.extensions(this.globalDir, this.fileRoot, extensions);
  }
  /**
   * Remove the global dir
   */
  async removeGlobalDir() {
    await remove.dir(this.globalDir);
  }
}
Config.fileTypes = require('./fileTypes');
module.exports = Config;
