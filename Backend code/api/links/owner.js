const express = require('express');
const router = express.Router()

const ownerController = require('../controllers/Owner');

router
    .get('/get', ownerController.getOwners)    
    .get('/getId/:name', ownerController.getIdByOwner)
    .get('/getOwner', ownerController.getOwnerByID);

router.post('/create', ownerController.createOwner);

module.exports = router;
