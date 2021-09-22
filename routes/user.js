const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
const userost = require('../controllers/users_controller')
const usignup = require('../controllers/users_controller')
router.get('/profile',userController.profile)
router.get('/post',userost.userPost);
router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signin)
router.post('/create',userController.create)
module.exports = router; // sending it to main index.js file