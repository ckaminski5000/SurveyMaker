var express = require('express');
var router = express.Router();
var qs = require('querystring');
const { getUser, createUser, updateUser, deleteUser, loginUser, refreshToken } = require('../controllers/userController');
var passport = require('passport');
var OpenIDConnectStrategy = require('passport-openidconnect');


router.get('/', function(req, res) {
  res.json({message: 'You got me'})
})
router.get('/getUser', getUser)
router.post('/create', createUser);
router.post('/login', loginUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/login', passport.authenticate('openidconnect'));
router.get('/oauth2/redirect', passport.authenticate('openidconnect', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;


