const express = require('express');
const router = express.Router();
const { createSubCategory, fetchAllSubCategories, updateSubCategory, deleteSubCategory, searchSubCategory } = require('../controller/SubCategory.controller');


router.post("/", createSubCategory )
    .get("/", fetchAllSubCategories)
    .put('/:id', updateSubCategory)
    .delete('/:id', deleteSubCategory)
    .get("/search", searchSubCategory);
    

exports.router = router;