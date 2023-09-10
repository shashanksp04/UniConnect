const express = require('express');
const router = express.Router()

const shareController = require('../controllers/ShareStore');

router
    .get('/find',shareController.showMembers);

module.exports = router;