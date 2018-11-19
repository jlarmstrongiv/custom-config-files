const Config = require('../config');

const initFileRoot = 'initFileRoot';
const initGlobalDir = 'initGlobalDir';
const initLocalDir = 'initGlobalDir';
const newFileRoot = 'newFileRoot';
const newGlobalDir = 'newGlobalDir';
const newLocalDir = 'newGlobalDir';

describe('Config constructor', () => {
  it('initializes variables', () => {
    const config = new Config({
      fileRoot: initFileRoot,
      globalDir: initGlobalDir,
      localDir: initLocalDir,
    });
    expect(config.fileRoot).toBe(initFileRoot);
    expect(config.localDir).toBe(initLocalDir);
    expect(config.globalDir).toBe(initGlobalDir);
  });

  it('throws error without fileRoot', () => {
    const t = () => {
      const config = new Config({ globalDir: initGlobalDir, });
    };
    expect(t).toThrow();
  });

  it('throws error without globalDir', () => {
    const t = () => {
      const config = new Config({ fileRoot: initFileRoot, });
    };
    expect(t).toThrow();
  });
});

describe('Config instance setters', () => {
  let config;
  beforeAll(() => {
    config = new Config({
      fileRoot: initFileRoot,
      globalDir: initGlobalDir,
      localDir: initLocalDir,
    });
  });

  it('setFileRoot', () => {
    config.setFileRoot(newFileRoot);
    expect(config.fileRoot).not.toBe(initFileRoot);
    expect(config.fileRoot).toBe(newFileRoot);
  });

  it('setLocalDir', () => {
    config.setLocalDir(newLocalDir);
    expect(config.localDir).not.toBe(initLocalDir);
    expect(config.localDir).toBe(newLocalDir);
  });

  it('setGlobalDir', () => {
    config.setGlobalDir(newGlobalDir);
    expect(config.globalDir).not.toBe(initGlobalDir);
    expect(config.globalDir).toBe(newGlobalDir);
  });
});
