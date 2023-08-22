const { User } = require('../model/User.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const data = new User({ ...req.body, password: hash });
    await data.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'An error occurred',
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: 'Login successful',
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.role,
            })
          : res.status(400).json({ message: 'invalid credentials' });
      });
    } else {
      res.status(401).json({
        message: 'No such user email',
        error: 'User not found',
      });
    }
  } catch (err) {
    res.status(400).json({
      message: 'An error occurred',
      error: err.message,
    });
  }
};

const sendResetPasswordMail = async (email, token) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alexie.kuphal@ethereal.email',
        pass: 'uWCHSaJN4eHMVpqSv3'
    },
  });
  const mailOption = {
    from: '<alexie.kuphal@ethereal.email>',
    to: email,
    subject: 'For Reset Password',
    html: `<p> Please copy the link and<a href="http://localhost:3000/reset-password?token=${token}"> reset your password. </p>`,
  };

  transport.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log('error :', err);
    } else {
      console.log('mail has been sent : ', info.response);
    }
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.send({ msg: 'email is required.' });
    }
    const user = await User.findOne({ email: email });

    if (user) {
      const users = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
      const newToken = jwt.sign(users, process.env.SECRETKEY);

      const data = await User.findOneAndUpdate({ email: user.email }, { token: newToken }, { new: true });
      sendResetPasswordMail(user.email, newToken);
      res.send({ msg: 'Please check mail box.' });
    } else {
      res.send({ msg: 'This email does not exists.' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const data = await User.findOne({ token });
    if (data) {
      const password = req.body.password;
      const hash = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate({ _id: data._id }, { password: hash }, { new: true });
      res.send({ msg: 'User password has been reset.' });
    } else {
      res.send({ msg: 'token has been expired.' });
    }
  } catch (err) {
    res.send({ msg: err.message });
  }
};
