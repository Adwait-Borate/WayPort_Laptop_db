const express = require('express');
const laptops = require('../controllers/laptop.controller.js');
const router = express.Router();

router.get('/', laptops.findAll);
router.get('/latest', laptops.getLatest);

module.exports = router;