const express = require('express');
const multer = require('multer');
const {
  createCategory,
  fetchAllCategories,
  deleteCategory,
  updateCategory,
  fetchCategoryById,
} = require('../sqlController/Category.controller');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .post('/', upload.single('image'), createCategory)
  .get('/', fetchAllCategories)
  .delete('/:id', deleteCategory)
  .get('/:id', fetchCategoryById)
  .put('/:id', upload.single('image'), updateCategory);

exports.router = router;
