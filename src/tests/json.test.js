const fs = require('fs-extra');
const Config = require('../config');
const fileTypes = require('../fileTypes');

const fileRoot = 'testing';
const globalDir = `${process.cwd()}/tests/global/json`;
const localDir = `${process.cwd()}/tests/local/json`;

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

describe('output, read, remove json', () => {
  const config = new Config({
    fileRoot,
    localDir,
    globalDir,
  });
  test('read returns null if no json', async (done) => {
    const isLocalData = await fs.exists(`${globalDir}/.${fileRoot}.json`);
    const isGlobalData = await fs.exists(`${localDir}/.${fileRoot}.json`);
    expect(isLocalData).toBeFalse();
    expect(isGlobalData).toBeFalse();

    const localData = await config.readLocal(fileTypes.json);
    const globalData = await config.readGlobal(fileTypes.json);
    const data = await config.read(fileTypes.json);
    expect(localData).toBeNull();
    expect(globalData).toBeNull();
    expect(data).toBeNull();
    done();
  });
  test('output with spaces, read, remove local json', async done => {
    await config.outputLocal(dummyData, fileTypes.json, { spacing: 4, });
    const data = await config.readLocal(fileTypes.json);
    expect(data).toMatchObject(dummyData);
    await config.removeLocal(fileTypes.json);
    const isFile = await fs.exists(`${localDir}/.${fileRoot}.json`);
    expect(isFile).toBeFalse();
    done();
  });
  test('output with tabs, read, remove global json', async done => {
    await config.outputGlobal(dummyData, fileTypes.json, { spacing: '\t', });
    const data = await config.readGlobal(fileTypes.json);
    expect(data).toMatchObject(dummyData);
    await config.removeGlobal(fileTypes.json);
    const isFile = await fs.exists(`${globalDir}/.${fileRoot}.json`);
    expect(isFile).toBeFalse();
    done();
  });
  afterAll(async () => {
    await fs.remove(`${localDir}/.${fileRoot}.json`);
    await fs.remove(`${globalDir}/.${fileRoot}.json`);
  });
});
