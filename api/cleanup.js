const fs = require('fs-extra');

const STAR_NAME_SEPARATOR = ' - ';

exports.run = async function run() {
  const path = process.env.PATH_CLEANUP;

  try {
    const files = await fs.readdir(path);

    const promises = files.map(async (file) => {
      if (file.indexOf('.') === 0) { return; }
      if (!file.includes(STAR_NAME_SEPARATOR)) { return; }

      const isFile = (await fs.stat(`${path}/${file}`)).isFile();
      if (!isFile) { return; }

      const starName = file.substr(0, file.indexOf(' - '));
      const starPathDir = `${path}/${starName}`;

      // Create star directory with his name.
      await fs.ensureDir(starPathDir);

      try {
        await fs.move(`${path}/${file}`, `${starPathDir}/${file}`);
      } catch (e) {
        console.log(`### fs.move: ${path}/${file}`, e.message);
        // Fail silently.
      }
    });

    await Promise.all(promises);
  } catch (e) {
    console.error(e);
  }
};

exports.test = function test() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
};
