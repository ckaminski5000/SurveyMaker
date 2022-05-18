var express = require('express');
var router = express.Router();
const { getSurvey, createSurvey, updateSurvey, deleteSurvey } = require('../controllers/SurveyController');
const { protect } = require('../middleware/authmiddleware');

router.get('/', getSurvey)
router.get('/public', getSurvey);
router.post('/create', createSurvey);
router.put('/update/:id', updateSurvey);
router.delete('/delete/:id', deleteSurvey)

module.exports = router;
