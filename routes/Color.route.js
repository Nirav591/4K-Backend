const express = require('express');
const { addColor, fetchColors, updateColor, deleteColor, searchColor } = require('../controller/Color.controller');
const router = express.Router();

router.post("/", addColor)
    .put('/:id', updateColor)
    .delete('/:id', deleteColor)
    .get("/", fetchColors)
    .get("/search", searchColor);
    

exports.router = router;