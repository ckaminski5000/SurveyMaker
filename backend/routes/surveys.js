var express = require('express');
var router = express.Router();
const { getSurvey, createSurvey, updateSurvey, deleteSurvey } = require('../controllers/SurveyController');
const { protect } = require('../middleware/authmiddleware');

router.get('/', protect, getSurvey)
router.get('/public', getSurvey);
router.post('/create', protect, createSurvey);
router.put('/update/:id', protect, updateSurvey);
router.delete('/delete/:id', protect, deleteSurvey)

module.exports = router;
