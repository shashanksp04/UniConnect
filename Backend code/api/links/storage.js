const express = require('express');
const router = express.Router()

const storageController = require('../controllers/StorageUnits');

router
    .delete('/delete',storageController.unlist) 
    .get('/get', storageController.allposts)
    .get('/getSpec', storageController.postSorting)    
    .get('/priceSorted', storageController.priceSort)
    .get('/dateSorted', storageController.dateSort);

router.post('/create', storageController.createStorage);

module.exports = router;
