const { User } = require('../model/User.model');

exports.fetchAllUser = async (req, res) => {
  try {
    const users = await User.find({}, 'name email phone role');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};
