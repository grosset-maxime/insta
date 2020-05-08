const fs = require('fs-extra');

const STAR_NAME_SEPARATOR = ' - ';

function buildPath(...args) {
  let path = '';
  args.forEach((arg, index) => {
    let p = arg.trim();
    if (!p) { return; }

    if (p.lastIndexOf('/') === p.length - 1 || p.lastIndexOf('\\') === p.length - 1) {
      p = p.slice(0, -1);
    }

    if (index === 0) {
      path = p;
      return;
    }

    if (p.indexOf('/') === 0 || p.indexOf('\\') === 0) {
      p = p.slice(-1);
    }
    path += `/${p}`;
  });

  return path;
}

exports.run = async function run() {
  const path = process.env.PATH_CLEANUP;
  const offsetPath = process.env.PATH_OFFSET_CLEANUP || '';

  try {
    const files = await fs.readdir(path);

    const promises = files.map(async (file) => {
      if (file.indexOf('.') === 0) { return; }
      if (!file.includes(STAR_NAME_SEPARATOR)) { return; }

      const isFile = (await fs.stat(buildPath(path, file))).isFile();
      if (!isFile) { return; }

      const starName = file.substr(0, file.indexOf(' - '));
      const starPathDir = buildPath(path, offsetPath, starName);

      // Create star directory with his name.
      await fs.ensureDir(starPathDir);

      try {
        await fs.move(
          buildPath(path, file),
          buildPath(starPathDir, file),
        );
      } catch (e) {
        console.log(`### fs.move: ${buildPath(path, file)}`, e.message);
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
