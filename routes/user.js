const express = require('express');
const router = express.Router();
const passport = require('passport')
const userController = require('../controllers/users_controller');
const userost = require('../controllers/users_controller')
const usignup = require('../controllers/users_controller')
router.get('/profile',passport.checkAuthentication,userController.profile)
router.get('/post',userost.userPost);
router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signin)
router.post('/create',userController.create)
// this will takes 3 argument 3 one will be middle ware i.e passport to authincate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
) ,userController.createSession )
module.exports = router; // sending it to main index.js file

router.get('/sign-out',userController.destroySession)