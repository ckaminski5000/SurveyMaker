var express = require('express');
var router = express.Router();
var qs = require('querystring');
const { getUser, updateUserSurveys, deleteUser, loginOrCreateUser } = require('../controllers/userController');



router.get('/', function(req, res) {
  res.json({message: 'You got me'})
})
router.get('/getUser', getUser)
router.post('/login', loginOrCreateUser);
router.put('/updateSurveys/:id', updateUserSurveys);
router.delete('/delete/:id', deleteUser);

module.exports = router;


