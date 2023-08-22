const { SubCategory } = require('../model/SubCategory.model');

exports.fetchAllSubCategories = async(req,res) =>{
  try{
    const subCategories = await SubCategory.find({});
    res.status(200).json(subCategories);
  }catch(err){
    res.status(400).json(err);
  }
}

exports.createSubCategory = async (req, res) => {
  const subCategories = new SubCategory(req.body);
  try {
    await subCategories.save();
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const subCategories = await SubCategory.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const subCategories = await SubCategory.findByIdAndDelete(id);
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.searchSubCategory = async(req,res)=>{
  const search = req.query.search ? {subCategoryName : { $regex: req.query.search, $options: "i" }} : {};
  const subCategories = await SubCategory.find(search);
  res.status(200).json(subCategories);  
}