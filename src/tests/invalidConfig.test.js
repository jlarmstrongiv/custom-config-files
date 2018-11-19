// It surprisingly difficult to crash the program.
// Even with setting Config instance properties to null,
// functions like read will return null,
// rather than crash.

// Instead, the util functions will be called
// with invalid arguments to test the error handlers

const fileTypes = require('../fileTypes');
const output = require('../utils/output');
const read = require('../utils/read');
const remove = require('../utils/remove');

describe('Output, read, and remove will not throw errors', () => {
  test('output error caught with invalid config args', async (done) => {
    const t = async () => {
      await output.json();
      await output.js();
      await output.env();
      await output.yml();

      await output.extension(null, null, '.nope');
    };
    expect(t).not.toThrow();
    done();
  });
  test('read error caught with invalid config args', async (done) => {
    const t = async () => {
      await read.json();
      await read.js();
      await read.env();
      await read.yml();

      await read.extension(null, null, '.nope');
    };
    expect(t).not.toThrow();
    done();
  });
  test('remove error caught with invalid config args', async (done) => {
    const t = async () => {
      await remove.extension(null, null, fileTypes.json);
      await remove.extension(null, null, fileTypes.js);
      await remove.extension(null, null, fileTypes.env);
      await remove.extension(null, null, fileTypes.yml);
      await remove.extension(null, null, '.nope');
      // unable to crash remove.extensions()
      await remove.dir({ error: 'pathname is not a string', });
    };
    expect(t).not.toThrow();
    done();
  });
});
