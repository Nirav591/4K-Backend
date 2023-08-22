const { Category } = require('../model/Category.model');

exports.fetchAllCategories = async(req,res) =>{
  try{
    const categories = await Category.find({});
    res.status(200).json(categories);
  }catch(err){
    res.status(400).json(err);
  }
}

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const data = await category.save();
    const result = await data.populate('subCategory');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    const result = await category.populate('subCategory');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.searchCategory = async(req,res)=>{
  const search = req.query.search ? {categoryName : { $regex: req.query.search, $options: "i" }} : {};
  const category = await Category.find(search);
  res.status(200).json(category);  
}
