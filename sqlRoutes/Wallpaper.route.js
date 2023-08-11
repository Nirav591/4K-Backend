const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createWallpaper,
  fetchWallPapers,
  deleteWallPaper,
  updateWallPaper,
  fetchWallPaperById,
  filterWallpapers,
} = require('../sqlController/Wallpaper.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .post('/', upload.single('image'), createWallpaper)
  .get('/', fetchWallPapers)
  .delete('/:id', deleteWallPaper)
  .put('/:id', upload.single('image'), updateWallPaper)
  .get('/:id', fetchWallPaperById)
  .get('/filter', filterWallpapers);

exports.router = router;
