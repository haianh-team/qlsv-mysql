const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
// router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
// router.get('/edituser/:id', userController.edit);
router.put('/edituser/:id', userController.update);
router.delete('/deleteuser/:id', userController.delete);


  
module.exports = router;