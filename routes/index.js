// const { Router } = require('express');
// const express = require('express') // this will fetch the exesting request
// const roueter = express.Router();
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller'); // getting home controller
const profileControllers = require('../controllers/home_controller');
console.log('router is loaded')

router.get('/',homeController.home) // getting homecontroller.home or importing homecontroller.home value from controller
router.get('/profile',profileControllers.profile)
module.exports = router; // sending it to main index.js file