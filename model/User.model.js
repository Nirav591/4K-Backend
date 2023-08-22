const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password:{type: String, required: true},
  role :{ type: String, required: true ,default: 'user'},
  phone: {type: Number},
  token: {type: String}
})

exports.User = mongoose.model("User", userSchema);
