const { connection } = require('../config/sql.config');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
  connection.getConnection(async (err, connection) => {
    console.log(`Connection as id ${connection.threadId}`);

    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = { ...req.body, password: hash };
      connection.query('INSERT INTO users SET ?', user, () => {
        connection.release();
        res.status(200).json(user);
      });
    } catch (err) {
      res.status(400).json({
        message: 'An error occurred',
        error: err.message,
      });
    }
  });
};

exports.loginUser = (req, res) => {
  connection.getConnection(async (err, connection) => {
    if (err) console.log('error:', err);
    console.log(`Connection as id ${connection.threadId}`);

    try {
      const email = req.body.email;
      connection.query('SELECT * FROM users WHERE email = ?', [email], (error, user) => {
        connection.release();
        if (user.length) {
          const token = jwt.sign({ id: user[0].id }, 'secretKey');
          bcrypt.compare(req.body.password, user[0].password).then(function (result) {
            result
              ? res.status(200).json({
                  message: 'Login successful',
                  id: user[0].id,
                  email: user[0].email,
                  name: user[0].name,
                  role: user[0].role,
                  token: token,
                })
              : res.status(400).json({ message: 'invalid credentials' });
          });
        } else {
          res.status(401).json({
            message: 'No such user email',
            error: 'User not found',
          });
        }
      });
    } catch (err) {
      res.status(400).json({
        message: 'An error occurred',
        error: err.message,
      });
    }
  });
};

const sendResetPasswordMail = async (email, token) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'dennis36@ethereal.email',
      pass: '3tswdAMD4jPjw533QG',
    },
  });
  const mailOption = {
    from: '<dennis36@ethereal.email>',
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

exports.forgotPassword = (req, res) => {
  let token = '';
  try {
    connection.getConnection((err, connection) => {
      if (err) console.log('error:', err);
      console.log(`Connection as id ${connection.threadId}`);

      const { email } = req.body;
      if (!email) {
        res.send({ msg: 'email is required.' });
      }
      connection.query('SELECT * FROM users WHERE email = ?', [email], (error, user) => {
        if (user.length) {
          token = jwt.sign(user[0].email, 'secreteKey');
          const sent = sendResetPasswordMail(user[0].email, token);

          if (sent != '0') {
            connection.query(`UPDATE users SET token =  ${token} ? WHERE email = ${email}`, (result, err) => {
              if (result) {
                return res.status(200).json({ msg: 'Please check mail box.' });
              }
              return res.status(400).json({ error: err });
            });
          } else {
            res.status(400).json({ msg: 'Something goes to wrong. Please try again' });
          }
        } else if (error) {
          res.status(400).json({ msg: 'This email does not exists.' });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    connection.getConnection((err, connection) => {
      if (err) console.log('error:', err);

      const token = req.body.token;
      connection.query('SELECT * from users WHERE token = ?', [token], async (err, user) => {
        if (user.length) {
          const hash = await bcrypt.hash(req.body.password, 10);
          connection.query(
            'UPDATE users SET password = ? WHERE email = ?',
            [hash, user[0].email],
            (result) => {
              res.send({ msg: 'User password has been reset.' });
            }
          );
        } else {
          res.send({ msg: 'token has been expired.' });
        }
      });
    });
  } catch (err) {
    res.send({ msg: err.message });
  }
};
