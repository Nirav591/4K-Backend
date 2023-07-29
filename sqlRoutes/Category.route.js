const express = require('express');
const { createCategory, fetchAllCategories } = require('../sqlController/Category.controller');
const router = express.Router();


router.post("/", createCategory )
    .get("/", fetchAllCategories);
    

exports.router = router;