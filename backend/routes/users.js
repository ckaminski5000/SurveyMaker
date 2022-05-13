var express = require('express');
var router = express.Router();
var qs = require('querystring');
const { getUser, updateUser, deleteUser, loginOrCreateUser } = require('../controllers/userController');
var passport = require('passport');
var OpenIDConnectStrategy = require('passport-openidconnect');


router.get('/', function(req, res) {
  res.json({message: 'You got me'})
})
router.get('/getUser', getUser)
router.post('/login', loginOrCreateUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;


