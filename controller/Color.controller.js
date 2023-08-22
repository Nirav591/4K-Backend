const { Color } = require('../model/Color.model');

exports.fetchColors = async(req,res) =>{
  try{
    const colors = await Color.find({});
    res.status(200).json(colors);
  }catch(err){
    res.status(400).json(err);
  }
}

exports.addColor = async (req, res) => {
  const color = new Color(req.body);
  try {
    await color.save();
    res.status(200).json(color);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateColor = async (req, res) => {
  const { id } = req.params;
  try {
    const color = await Color.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(color);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteColor = async (req, res) => {
  const { id } = req.params;
  try {
    const color = await Color.findByIdAndDelete(id);
    res.status(200).json(color);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.searchColor = async(req,res)=>{
  const search = req.query.search ? {colorName : { $regex: req.query.search, $options: "i" }} : {};
  const color = await Color.find(search);
  res.status(200).json(color);  
}