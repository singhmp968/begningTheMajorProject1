// we are making index.js as the root of the All the routers
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller'); // getting home controller
const profileControllers = require('../controllers/home_controller');
const aboutUscontroller = require('../controllers/home_controller');
console.log('router is loaded')

router.get('/',homeController.home) //here we are creating / as the main rute  getting homecontroller.home or importing homecontroller.home value from controller
router.get('/action',profileControllers.action)
router.get('/aboutUs',aboutUscontroller.aboutUs)
/*******Important here we are passing any /user req i.e get,post,put anything using ruter ******** */

router.use('/user',require('./user')) // pleas check index.js i.e the main index.js file app.use('/',require('./routes')) we are tying to makeand passing as ./user
// for calling from post.js
router.use('/posts',require('./post'))

//for any further routes,access from here
// router.use('/routerName',require(./routerFileName))
router.use('/game',require('./games'))
// maingroute for class file
router.use('/class-teacthe',require('./classes12'))

module.exports = router; // sending it to main index.js file