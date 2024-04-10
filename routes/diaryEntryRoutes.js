// routes/diaryEntryRoutes.js
const express = require('express');
const router = express.Router();
const diaryEntryController = require('../controllers/diaryEntryController');
const authenticateToken = require('../middleware/authMiddleware'); // Import authentication middleware

// Create diary entry route (requires authentication)
router.post('/', authenticateToken, diaryEntryController.create);

// Get all diary entries route (requires authentication)
router.get('/', authenticateToken, diaryEntryController.getAll);

// Update diary entry route (requires authentication)
router.put('/:id', authenticateToken, diaryEntryController.update);

// Delete diary entry route (requires authentication)
router.delete('/:id', authenticateToken, diaryEntryController.deleteEntry);

module.exports = router;
