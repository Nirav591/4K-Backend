const express = require('express');
const router = express.Router();
const { createCategory, fetchAllCategories, updateCategory, deleteCategory, searchCategory} = require('../controller/Category.controller');


router.post("/", createCategory)
    .put('/:id', updateCategory)
    .delete('/:id', deleteCategory)
    .get("/", fetchAllCategories)
    .get("/search", searchCategory);
    

exports.router = router;