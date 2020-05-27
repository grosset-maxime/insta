const fs = require('fs-extra');
const readline = require('readline');

const STAR_NAME_SEPARATOR = ' - ';
const OF_SEPARATOR = 'of - ';
const DEVART_SEPARATOR = '_by_';

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

function getFileNameFromUrl(url = '') {
  let theUrl = url;
  if (url.includes('?')) {
    theUrl = url.substr(0, url.lastIndexOf('?'));
  }
  const m = theUrl.match(/(?=\w+\.\w{3,4}$).+/);
  return m && m.length > 0 ? m[0] : '';
}

async function moveFile(options) {
  const {
    file, starName, path, offsetPath,
  } = options;
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
}

exports.run = async function run() {
  const path = process.env.PATH_CLEANUP;
  const offsetPath = process.env.PATH_OFFSET_CLEANUP || '';

  try {
    const files = await fs.readdir(path);

    const promises = files.map(async (file) => {
      let starName;

      if (file.indexOf('.') === 0) { return; }

      const isFile = (await fs.stat(buildPath(path, file))).isFile();
      if (!isFile) { return; }

      if (file.indexOf(OF_SEPARATOR) === 0) {
        starName = file.slice(OF_SEPARATOR.length).slice(0, -4);

        const readInterface = readline.createInterface({
          input: fs.createReadStream(buildPath(path, file)),
        });

        readInterface.on('line', async (line) => {
          const fileName = getFileNameFromUrl(line);

          await moveFile({
            path,
            offsetPath,
            starName,
            file: fileName,
          });
        });

        readInterface.on('close', async () => {
          await fs.unlink(buildPath(path, file));
        });

        return;
      }

      if (file.includes(STAR_NAME_SEPARATOR)) {
        starName = file.substr(0, file.indexOf(STAR_NAME_SEPARATOR));
      } else if (file.includes(DEVART_SEPARATOR)) {
        starName = file.slice(file.lastIndexOf(DEVART_SEPARATOR) + DEVART_SEPARATOR.length);
        starName = starName.substr(0, starName.lastIndexOf('_'));
      }

      if (starName) {
        await moveFile({
          path, file, offsetPath, starName,
        });
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
