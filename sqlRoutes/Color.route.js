const express = require('express');
const { createColor, fetchAllColors } = require('../sqlController/Color.controller');
const router = express.Router();


router.post("/", createColor )
    .get("/", fetchAllColors);
    

exports.router = router;