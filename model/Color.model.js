const mongoose = require('mongoose');
const schema = mongoose.Schema;

const colorSchema = new schema({
  colorName: { type: String, required: true },
  img: { type: String, required: true },
  status : { type: String, default: 'Active'}
});

exports.Color = mongoose.model('Color', colorSchema);
