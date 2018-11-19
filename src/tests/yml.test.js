const fs = require('fs-extra');
const Config = require('../config');
const fileTypes = require('../fileTypes');

const fileRoot = 'testing';
const globalDir = `${process.cwd()}/tests/global/yml`;
const localDir = `${process.cwd()}/tests/local/yml`;

const dummyData = {
  myNum: 1,
  myBool: true,
  myStr: 'string',
  myObj: {
    myKey: 'value',
    myOtherKey: 'value',
  },
  myArr: [1, 2, 3,],
};

describe('output, read, remove yml', () => {
  const config = new Config({
    fileRoot,
    localDir,
    globalDir,
  });
  test('read returns null if no yml', async done => {
    const isLocalData = await fs.exists(`${globalDir}/.${fileRoot}.yml`);
    const isGlobalData = await fs.exists(`${localDir}/.${fileRoot}.yml`);
    expect(isLocalData).toBeFalse();
    expect(isGlobalData).toBeFalse();

    const localData = await config.readLocal(fileTypes.yml);
    const globalData = await config.readGlobal(fileTypes.yml);
    const data = await config.read(fileTypes.yml);
    expect(localData).toBeNull();
    expect(globalData).toBeNull();
    expect(data).toBeNull();
    done();
  });
  test('output, read, remove local yml with spaces', async done => {
    await config.outputLocal(dummyData, fileTypes.yml, { spacing: 4, });
    const data = await config.readLocal(fileTypes.yml);
    expect(data).toMatchObject(dummyData);
    await config.removeLocal(fileTypes.yml);
    const isFile = await fs.exists(`${localDir}/.${fileRoot}.yml`);
    expect(isFile).toBeFalse();
    done();
  });
  test('output, read, remove global yml', async done => {
    await config.outputGlobal(dummyData, fileTypes.yml);
    const data = await config.readGlobal(fileTypes.yml);
    expect(data).toMatchObject(dummyData);
    await config.removeGlobal(fileTypes.yml);
    const isFile = await fs.exists(`${globalDir}/.${fileRoot}.yml`);
    expect(isFile).toBeFalse();
    done();
  });
  afterAll(async () => {
    await fs.remove(`${localDir}/.${fileRoot}.yml`);
    await fs.remove(`${globalDir}/.${fileRoot}.yml`);
  });
});
