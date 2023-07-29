const express = require('express');
const { fetchAllusers } = require('../sqlController/User.controller');
const router = express.Router();

router.get('/', fetchAllusers);

exports.router = router;