const express = require('express');
const multer = require('multer');
const {
  createSubCategory,
  fetchAllSubCategories,
  deleteSubCategory,
  updateSubCategory,
  fetchSubCategoryById,
} = require('../sqlController/SubCategory.controller');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .post('/', upload.single('image'), createSubCategory)
  .get('/', fetchAllSubCategories)
  .delete('/:id', deleteSubCategory)
  .get('/:id', fetchSubCategoryById)
  .put('/:id', upload.single('image'), updateSubCategory);

exports.router = router;
