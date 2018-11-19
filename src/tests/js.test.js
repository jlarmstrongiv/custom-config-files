const fs = require('fs-extra');
const Config = require('../config');
const fileTypes = require('../fileTypes');

const fileRoot = 'testing';
const globalDir = `${process.cwd()}/tests/global/js`;
const localDir = `${process.cwd()}/tests/local/js`;

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

describe('output, read, remove js', () => {
  const config = new Config({
    fileRoot,
    localDir,
    globalDir,
  });
  test('read returns null if no js', async done => {
    const isLocalData = await fs.exists(`${globalDir}/.${fileRoot}.js`);
    const isGlobalData = await fs.exists(`${localDir}/.${fileRoot}.js`);
    expect(isLocalData).toBeFalse();
    expect(isGlobalData).toBeFalse();

    const localData = await config.readLocal(fileTypes.js);
    const globalData = await config.readGlobal(fileTypes.js);
    const data = await config.read(fileTypes.js);
    expect(localData).toBeNull();
    expect(globalData).toBeNull();
    expect(data).toBeNull();
    done();
  });
  test('output, read, remove local js with spaces', async done => {
    await config.outputLocal(dummyData, fileTypes.js, { spacing: 4, });
    const data = await config.readLocal(fileTypes.js);
    expect(data).toMatchObject(dummyData);
    await config.removeLocal(fileTypes.js);
    const isFile = await fs.exists(`${localDir}/.${fileRoot}.js`);
    expect(isFile).toBeFalse();
    done();
  });
  test('output, read, remove global js with tabs', async done => {
    await config.outputGlobal(dummyData, fileTypes.js, { spacing: '\t', });
    const data = await config.readGlobal(fileTypes.js);
    expect(data).toMatchObject(dummyData);
    await config.removeGlobal(fileTypes.js);
    const isFile = await fs.exists(`${globalDir}/.${fileRoot}.js`);
    expect(isFile).toBeFalse();
    done();
  });
  afterAll(async () => {
    await fs.remove(`${localDir}/.${fileRoot}.js`);
    await fs.remove(`${globalDir}/.${fileRoot}.js`);
  });
});
