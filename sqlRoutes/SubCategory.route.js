const express = require('express');
const { createSubCategory, fetchAllSubCategories } = require('../sqlController/SubCategory.controller');
const router = express.Router();


router.post("/", createSubCategory )
    .get("/", fetchAllSubCategories);
    

exports.router = router;