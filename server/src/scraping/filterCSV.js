const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { Parser } = require('json2csv');

const csvFilePath = path.join(__dirname, 'companies-2023-q4-sm.csv');
const outputPath = path.join(__dirname, 'filtered.csv');

const allowedCountries = ['US', 'FR', 'CN'];
const filteredData = [];

fs.createReadStream(csvFilePath)
  .pipe(parse({
    columns: true,
    trim: true,
    skip_empty_lines: true,
    relax_quotes: true,        // biar quotes di dalam kolom nggak bikin error
    relax_column_count: true,  // biar parser tetap jalan meski ada kolom kosong
  }))
  .on('data', (row) => {
    const country = row.country_code?.trim();
    if (allowedCountries.includes(country)) {
      filteredData.push(row);
    }
  })
  .on('end', () => {
    if (!filteredData.length) {
      console.log('Tidak ada data sesuai filter.');
      return;
    }
    const headers = Object.keys(filteredData[0]);
    const parser = new Parser({ fields: headers });
    const csvOutput = parser.parse(filteredData);
    fs.writeFileSync(outputPath, csvOutput);
    console.log(`CSV baru dibuat: ${filteredData.length} baris`);
  });
