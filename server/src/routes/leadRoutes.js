const express = require ('express');
const { getLeads, createLead, deleteLead, exportLeads } = require('../controllers/LeadController.js');

const router = express.Router();

router.get('/', getLeads);
router.post('/', createLead);
router.delete('/:id', deleteLead);
router.get('/export', exportLeads);
module.exports = router;
