const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Lead = require('../models/Lead.js');
const mongoose = require('mongoose');
require('dotenv').config();

function calculateScore(lead) {
  let score = 0;


  if (lead.bbbrating) {
    switch (lead.bbbrating.toUpperCase()) {
      case 'AAA': score += 5; break;
      case 'AA': score += 4; break;
      case 'A': score += 3; break;
      case 'BBB': score += 2; break;
      default: score += 1;
    }
  }


  if (lead.website && lead.website.startsWith('http')) {
    score += 2;
  }

  if (lead.companyphone && lead.companyphone.match(/\d{7,}/)) {
    score += 1;
  }


  if (lead.industry && ['Tech', 'Software', 'AI'].includes(lead.industry)) {
    score += 2;
  }

  return score;
}


function importCSV(filePath) {
  const leads = [];
  fs.createReadStream(filePath)
    .pipe(csv())
  .on('data', (row) => {
  const industryCombined = (row.Industry || '') + ((row.Sector) ? ', ' + row.Sector : '');

  const lead = {
    company: row.Company || '',
    industry: industryCombined || 'N/A',
    address: row['HQ State'] || 'N/A',       
    bbbrating: row['Annual Income Tax in 2022-2023 (USD in Billions)'] || "N/A",
    source: row['Source'] || 'N/A',
    companyphone: row['Company Phone'] || 'N/A',
    website: row['Website'] || 'N/A',
    country: 'united states',
    linkedin: row['LinkedIn'] || 'N/A',
    currentemployees: row['Employee Size'] || 'N/A',
  };


  lead.score = calculateScore({
    ...lead,
    industry: industryCombined
  });

  leads.push(lead);
})
 .on('end', async () => {
      console.log('CSV file successfully processed.');
      try {
        const DB_URL = process.env.atlas_URL;
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await Lead.insertMany(leads);
        console.log('All leads saved with scoring!');
        mongoose.disconnect();
      } catch (error) {
        console.error('Error saving leads:', error);
      }
    });
}

   


const csvFilePath = path.join(__dirname, 'Top 50 US Tech Companies 2022 - 2023.csv');
importCSV(csvFilePath);
