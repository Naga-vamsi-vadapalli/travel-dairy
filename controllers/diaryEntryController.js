// controllers/diaryEntryController.js
const DiaryEntry = require('../models/DiaryEntry');

// Create diary entry
const create = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newEntry = new DiaryEntry({
            title,
            content,
            user: req.userId // Attach user ID from JWT token
        });

        await newEntry.save();

        res.status(201).json({ message: 'Diary entry created successfully' });
    } catch (error) {
        console.error('Create diary entry error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Read diary entries
const getAll = async (req, res) => {
    try {
        const diaryEntries = await DiaryEntry.find({ user: req.userId });
        res.json(diaryEntries);
    } catch (error) {
        console.error('Get all diary entries error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update diary entry
const update = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedEntry = await DiaryEntry.findByIdAndUpdate(id, { title, content });
        if (!updatedEntry) {
            return res.status(404).json({ error: 'Diary entry not found' });
        }
        res.json({ message: 'Diary entry updated successfully' });
    } catch (error) {
        console.error('Update diary entry error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete diary entry
const deleteEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await DiaryEntry.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ error: 'Diary entry not found' });
        }
        res.json({ message: 'Diary entry deleted successfully' });
    } catch (error) {
        console.error('Delete diary entry error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    create,
    getAll,
    update,
    deleteEntry
};
