const express = require('express');
const { fetchAllusers, updateusers } = require('../sqlController/User.controller');
const router = express.Router();

router.get('/', fetchAllusers)
  .put('/:id', updateusers);

exports.router = router;