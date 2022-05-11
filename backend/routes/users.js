var express = require('express');
var router = express.Router();
const { getUser, createUser, updateUser, deleteUser, loginUser, refreshToken } = require('../controllers/userController');
const { protect } = require('../middleware/authmiddleware');

router.get('/getUser', protect, getUser)
router.post('/create', createUser);
router.post('/login', loginUser);
router.put('/update/:id', protect, updateUser);
router.delete('/delete/:id', protect, deleteUser);
router.get('/refresh', refreshToken, protect, getUser);

module.exports = router;
