const fs = require('fs-extra');

const Config = require('../config');

const fileRoot = 'testing';
const globalDir = `${process.cwd()}/tests/global/dir`;

describe('removeGlobalDir', () => {
  test('remove the Config global directory', async (done) => {
    let config = new Config({
      fileRoot,
      globalDir,
    });

    await fs.ensureDir(globalDir);
    let isFolder = await fs.exists(globalDir);
    expect(isFolder).toBeTrue();

    await config.removeGlobalDir();
    isFolder = await fs.exists(globalDir);
    expect(isFolder).toBeFalse();

    done();
  });
});
