const express = require('express');
const { fetchAllUser } = require('../controller/Admin.controller');
const router = express.Router();

router.get('/users', fetchAllUser);

exports.router = router;