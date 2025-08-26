const mongoose = require ('mongoose');

const leadSchema = new mongoose.Schema({
  company: { type: String },
  industry: { type: String },
  address: { type: String },
  bbbrating: { type: String },
  source: { type: String },
  companyphone: { type: String },
  website: { type: String },
  score: { type: Number, default: 0 },
  country: { type: String, default: 'N/A' },
  linkedin: { type: String, default: 'N/A' },
  currentemployees: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
