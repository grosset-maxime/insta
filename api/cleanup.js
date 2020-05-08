const fs = require('fs-extra');

exports.run = async function () {
    const STAR_NAME_SEPARATOR = ' - ';
    const path = process.env.PATH_CLEANUP;

    try {
        const files = await fs.readdir(path);

        const promises = files.map(async (file) => {
            if (file.indexOf('.') === 0) { return }
            if (!file.includes(STAR_NAME_SEPARATOR)) { return }

            const isFile = (await fs.stat(`${path}/${file}`)).isFile();
            if (!isFile) { return }

            const starName = file.substr(0, file.indexOf(' - '));
            const starPathDir = `${path}/${starName}`;

            // Create star directory with his name.
            await fs.ensureDir(starPathDir);
            await fs.move(`${path}/${file}`, `${starPathDir}/${file}`);
        });

        await Promise.all(promises)
    } catch (e) {
        console.error(e);
    }
};

exports.test = function () {
    return new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });
}