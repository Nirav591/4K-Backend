const mongoose = require('mongoose');
const schema = mongoose.Schema;

const wallPaperSchema = new schema({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  type: { type: String },
  wallpaperTitle: { type: String, required: true },
  img: { type: String, required: true },
  wallpaperTags: { type: String },
  wallpaperColor: { type: String },
  status: { type: String, default: 'Active' },
});

exports.WallPaper = mongoose.model('WallPaper', wallPaperSchema);
