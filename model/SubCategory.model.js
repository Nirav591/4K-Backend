const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subCategorySchema = new schema(
  {
    subCategoryName: { type: String, required: true},
    category: { type: String, required: true},
    img: { type: String, required: true}, 
    status : { type: String, default: 'Active'}   
  }
);

exports.SubCategory = mongoose.model('SubCategory', subCategorySchema);
