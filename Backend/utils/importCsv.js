const fs = require('fs');
const csv = require('csv-parser');
const connection = require('../config/db.config');

const importCsv = () => {
  fs.createReadStream('path_to_your_csv/new_spotify.csv')
    .pipe(csv())
    .on('data', (row) => {
      const query = 'INSERT INTO laptops SET ?';
      connection.query(query, row, (error, response) => {
        if (error) throw error;
      });
    })
    .on('end', () => {
      console.log('CSV file successfully imported');
    });
};

module.exports = importCsv; 