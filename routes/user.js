const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
const userost = require('../controllers/users_controller')
router.get('/profile',userController.profile)
router.get('/post',userost.userPost);
module.exports = router; // sending it to main index.js file