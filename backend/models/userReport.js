const mongoose = require('mongoose');

const UserReportSchema = new mongoose.Schema({
  content: { type: String, required: true },
  reliability: { type: String, required: true },
  details: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserReport', UserReportSchema);
