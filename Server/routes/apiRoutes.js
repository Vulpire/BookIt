const express = require('express');
const controller = require('../controllers/apiController');

const router = express.Router();

router.post('/', controller.index);

module.exports = router;