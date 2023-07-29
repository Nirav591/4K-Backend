const express = require('express');
const router = express.Router();
const { createWallpaper, fetchWallPapers } = require('../sqlController/Wallpaper.controller');


router.post("/", createWallpaper )
    .get("/", fetchWallPapers);
    

exports.router = router;