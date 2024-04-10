const express = require('express');
const router = express.Router();
const DiaryEntryController = require('../controllers/diaryEntryController');

router.get('/', DiaryEntryController.getAllEntries);
router.post('/', DiaryEntryController.createEntry);
router.get('/:entryId', DiaryEntryController.getEntryById);
router.put('/:entryId', DiaryEntryController.updateEntry);
router.delete('/:entryId', DiaryEntryController.deleteEntry);

module.exports = router;
ś