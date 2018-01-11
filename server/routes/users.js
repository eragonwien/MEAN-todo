
var express = require('express');
var router = express.Router();

var userctrl = require('../controllers/user');
/* GET users listing. */
router.get('/:id', userctrl.getUserByID);

module.exports = router;
