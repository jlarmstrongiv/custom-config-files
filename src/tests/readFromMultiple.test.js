const fs = require('fs-extra');
const Config = require('../config');
const fileTypes = require('../fileTypes');

const fileRoot = 'testing';
const globalDir = `${process.cwd()}/tests/global/multiple`;
const localDir = `${process.cwd()}/tests/local/multiple`;

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

describe('findOne from multiple configs', () => {
  const config = new Config({
    fileRoot,
    localDir,
    globalDir,
  });
  test('choose the most recent config', async done => {
    await config.outputLocal({ order: 1, }, fileTypes.json);
    await config.outputLocal({ order: 2, }, fileTypes.js);
    await config.outputLocal({ order: 3, }, fileTypes.env);
    await config.outputLocal({ order: 4, }, fileTypes.yml);
    const data = await config.read();
    expect(data).toMatchObject({ order: 4, });
    await config.removeLocal(fileTypes.json);
    done();
  });
  afterAll(async () => {
    await fs.remove(`${localDir}/.${fileRoot}.json`);
    await fs.remove(`${localDir}/.${fileRoot}.js`);
    await fs.remove(`${localDir}/.${fileRoot}.env`);
    await fs.remove(`${localDir}/.${fileRoot}.yml`);
  });
});
