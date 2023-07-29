const express = require('express');
const { createWallPaper, fetchWallPapers, deleteWallPaper, searchWallPaper, filterWallpapers } = require('../controller/WallPaper.controller');
const router = express.Router();


router.post("/", createWallPaper )
    .get("/", fetchWallPapers)
    .delete('/:id', deleteWallPaper)
    .get("/search", searchWallPaper)
    .get("/filter", filterWallpapers);
    

exports.router = router;