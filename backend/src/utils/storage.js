const path = require('path');
const fs = require('fs').promises;

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

async function readData(fileName, fallback = []) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

async function writeData(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readData,
  writeData,
  DATA_DIR
};
