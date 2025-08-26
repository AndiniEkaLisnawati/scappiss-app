const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Lead = require('../models/Lead.js');
const mongoose = require('mongoose');
require('dotenv').config();

function calculateScore(lead) {
  let score = 3.0;


  const emp = parseInt(lead.currentemployees, 10);
  if (!isNaN(emp)) {
    if (emp > 5000) score += 0.8;
    else if (emp >= 1000) score += 0.6;
    else if (emp >= 100) score += 0.3;
    else if (emp > 0) score += 0.1;
  }


  if (lead.industry) {
    if (/(tech|software|finance|healthcare|ai|cloud)/i.test(lead.industry)) score += 1.0;
    else if (/(manufacturing|automotive|logistics)/i.test(lead.industry)) score += 0.5;
    else score += 0.2;
  }

  return score;
}

async function importCSV(filePath) {
  const leads = [];
  const BATCH_SIZE = 500;
  const MAX_LEADS = 900; 
  const ALLOWED_COUNTRIES = ['united states', 'canada', 'united kingdom', 'france'];

  const processBatch = async () => {
    if (leads.length > 0) {
      try {
        await Lead.insertMany(leads);
        console.log(`✅ Inserted ${leads.length} leads`);
        leads.length = 0;
      } catch (err) {
        console.error('❌ Error inserting batch:', err);
      }
    }
  };

  const stream = fs.createReadStream(filePath).pipe(csv());

  let totalProcessed = 0;

  stream.on('data', (row) => {
    if (totalProcessed >= MAX_LEADS) return; 

    const country = row.country || 'N/A';
    if (!ALLOWED_COUNTRIES.includes(country)) return; 

    const website = row.domain ? `http://${row.domain}` : 'N/A';
    const lead = {
      company: row.name || 'N/A',
      industry: row.industry || 'N/A',
      address: row.locality || 'N/A',
      bbbrating: 'N/A',
      companyphone: 'N/A',
      website,
      linkedin: row['linkedin url'] || 'N/A',
      country,
      currentemployee: row['current employee estimate'] || 0
    };
    
    lead.score = calculateScore(lead);
    leads.push(lead);
    totalProcessed++;

    if (leads.length >= BATCH_SIZE) {
      stream.pause();
      processBatch().then(() => stream.resume());
    }
  })
  .on('end', async () => {
    console.log('✅ CSV file processed. Saving remaining leads...');
    await processBatch();
    mongoose.disconnect();
    console.log(`🎯 Import completed! Total leads saved: ${totalProcessed}`);
  })
  .on('error', (err) => {
    console.error('❌ CSV read error:', err);
  });

  try {
    const DB_URL = process.env.atlas_URL;
    await mongoose.connect(DB_URL);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ DB connection failed:', error);
  }
}

const csvFilePath = path.join(__dirname, 'companies_sorted.csv');
importCSV(csvFilePath);
