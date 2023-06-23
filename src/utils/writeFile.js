const fs = require("fs");

function writeCSV(fileName, records) {
  return new Promise((resolve, reject) => {
    const cols = Object.keys(records[0]);
    const lines = [];
    lines.push(cols.join(';'));
    for (const record of records) {
      const values = [];
      for (const col of cols) {
        values.push(record[col]);
      }
      lines.push(values.join(';'));
    }
    const content = lines.join('\n');
    const file = {
      filename: fileName,
      content: content,
    };

    resolve(file)
  });
}

module.exports = writeCSV
