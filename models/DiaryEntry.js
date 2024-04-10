const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);

module.exports = DiaryEntry;
