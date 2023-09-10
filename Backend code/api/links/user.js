const express = require('express');
const router = express.Router()

const userController = require('../controllers/User');

router
    .get('/get', userController.getUsers)    
    .get('/getId/:name', userController.getIdByUser);

router.post('/create', userController.createUser);

module.exports = router;
