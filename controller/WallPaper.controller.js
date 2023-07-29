const { WallPaper } = require('../model/WallPaper.model');

exports.fetchWallPapers = async (req, res) => {
  try {
    const wallPaper = await WallPaper.find({});
    res.status(200).json(wallPaper);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createWallPaper = async (req, res) => {
  const wallPaper = new WallPaper(req.body);
  try {
    await wallPaper.save();
    res.status(200).json(wallPaper);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteWallPaper = async (req, res) => {
  try {
    const wallPaper = await WallPaper.findByIdAndDelete(req.params.id);
    res.status(200).json(wallPaper);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.searchWallPaper = async (req, res) => {
  const search = req.query.search ? { wallpaperTitle: { $regex: req.query.search, $options: 'i' } } : {};
  const wallPaper = await WallPaper.find(search);
  res.status(200).json(wallPaper);
};

exports.filterWallpapers = async (req, res) => {
  let query = '';
  if (req.query.category) {
    const cate = req.query.category ? { category: { $regex: req.query.category, $options: 'i' } } : {};
    query = WallPaper.find(cate);
  }
  if (req.query.wallpaperColor) {
    const wall = req.query.wallpaperColor
      ? { wallpaperColor: { $regex: req.query.wallpaperColor, $options: 'i' } }
      : {};
    query = query.find(wall);
  }
  if (req.query.type) {
    const types = req.query.type ? { type: { $regex: req.query.type, $options: 'i' } } : {};
    query = query.find(types);
  }

  try {
    const doc = await query.exec();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
