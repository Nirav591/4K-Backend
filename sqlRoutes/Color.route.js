const express = require('express');
const {
  createColor,
  fetchAllColors,
  fetchColorById,
  updateColor,
  deleteColor,
} = require('../sqlController/Color.controller');
const router = express.Router();

router
  .post('/', createColor)
  .get('/:id', fetchColorById)
  .get('/', fetchAllColors)
  .put('/:id', updateColor)
  .delete('/:id', deleteColor);

exports.router = router;
