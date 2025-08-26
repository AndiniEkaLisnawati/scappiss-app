const Lead = require('../models/Lead.js');
const { Parser } = ('json2csv');


 const getLeads = async (req, res) => {
  try {
    const { company, scoreMin } = req.query;
    const query = {};
    if (company) query.company = { $regex: company, $options: 'i' };
    if (scoreMin) query.score = { $gte: Number(scoreMin) };

    const leads = await Lead.find(query).sort({ score: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


 const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 const exportLeads = async (req, res) => {
  try {
    const leads = await Lead.find({});
    const parser = new Parser();
    const csv = parser.parse(leads);
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getLeads,
  createLead,
  deleteLead,
  exportLeads
};
