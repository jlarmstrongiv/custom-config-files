module.exports = async () => {
  const fs = require('fs-extra');
  const testsDir = `${process.cwd()}/tests`;
  await fs.remove(testsDir);
};
