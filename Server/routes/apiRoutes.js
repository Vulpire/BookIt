const express = require('express');
const controller = require('../controllers/apiController');

const router = express.Router();

router.get('/', controller.index);

router.post('/', controller.newEvent)

router.get('/user', controller.getUser);

module.exports = router;