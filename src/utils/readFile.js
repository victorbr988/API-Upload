const fs = require("fs");

function readCSV(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, { encoding: 'latin1' }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const lines = data.split('\n');
      const cols = lines[0].split(';');
      const records = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') continue;
        const values = line.split(';');
        const record = {};
        for (let j = 0; j < cols.length; j++) {
          record[cols[j]] = values[j];
        }
        records.push(record);
      }
      resolve(records);
    });
  });
}

module.exports = readCSV