const fs = require('fs-extra');
const Config = require('../config');
const fileTypes = require('../fileTypes');

const fileRoot = 'testing';
const globalDir = `${process.cwd()}/tests/global/env`;
const localDir = `${process.cwd()}/tests/local/env`;

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

describe('output, read, remove env', () => {
  const config = new Config({
    fileRoot,
    localDir,
    globalDir,
  });
  test('read returns null if no env', async done => {
    const isLocalData = await fs.exists(`${globalDir}/.${fileRoot}.env`);
    const isGlobalData = await fs.exists(`${localDir}/.${fileRoot}.env`);
    expect(isLocalData).toBeFalse();
    expect(isGlobalData).toBeFalse();

    const localData = await config.readLocal(fileTypes.env);
    const globalData = await config.readGlobal(fileTypes.env);
    const data = await config.read(fileTypes.env);
    expect(localData).toBeNull();
    expect(globalData).toBeNull();
    expect(data).toBeNull();
    done();
  });
  test('output, read, remove local env', async done => {
    await config.outputLocal(dummyData, fileTypes.env);
    const data = await config.readLocal(fileTypes.env);
    expect(data).toMatchObject(dummyData);
    await config.removeLocal(fileTypes.env);
    const isFile = await fs.exists(`${localDir}/.${fileRoot}.env`);
    expect(isFile).toBeFalse();
    done();
  });
  test('output, read, remove global env', async done => {
    await config.outputGlobal(dummyData, fileTypes.env);
    const data = await config.readGlobal(fileTypes.env);
    expect(data).toMatchObject(dummyData);
    await config.removeGlobal(fileTypes.env);
    const isFile = await fs.exists(`${globalDir}/.${fileRoot}.env`);
    expect(isFile).toBeFalse();
    done();
  });
  afterAll(async () => {
    await fs.remove(`${localDir}/.${fileRoot}.env`);
    await fs.remove(`${globalDir}/.${fileRoot}.env`);
  });
});
