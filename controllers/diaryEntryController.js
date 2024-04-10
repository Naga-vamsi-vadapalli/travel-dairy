// controllers/diaryEntryController.js

const DiaryEntry = require('../models/DiaryEntry');

const DiaryEntryController = {
  getAllEntries: async (req, res) => {
    try {
      // Fetch all diary entries from database
      const entries = await DiaryEntry.find();

      res.json({ data: entries });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  createEntry: async (req, res) => {
    try {
      // Extract diary entry data from request body
      const { title, description, date, location, photos } = req.body;

      // Create new diary entry
      const newEntry = new DiaryEntry({ title, description, date, location, photos });

      // Save diary entry to database
      await newEntry.save();

      res.status(201).json({ message: 'Diary entry created successfully', data: newEntry });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getEntryById: async (req, res) => {
    try {
      // Get entry ID from request params
      const { entryId } = req.params;

      // Find entry by ID
      const entry = await DiaryEntry.findById(entryId);
      if (!entry) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }

      res.json({ data: entry });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  updateEntry: async (req, res) => {
    try {
      // Get entry ID from request params
      const { entryId } = req.params;

      // Extract updated entry data from request body
      const { title, description, date, location, photos } = req.body;

      // Find entry by ID and update
      let entry = await DiaryEntry.findById(entryId);
      if (!entry) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }

      entry.title = title;
      entry.description = description;
      entry.date = date;
      entry.location = location;
      entry.photos = photos;

      // Save updated entry to database
      await entry.save();

      res.json({ message: 'Diary entry updated successfully', data: entry });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  deleteEntry: async (req, res) => {
    try {
      // Get entry ID from request params
      const { entryId } = req.params;

      // Find entry by ID and delete
      const entry = await DiaryEntry.findByIdAndDelete(entryId);
      if (!entry) {
        return res.status(404).json({ message: 'Diary entry not found' });
      }

      res.json({ message: 'Diary entry deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = DiaryEntryController;
