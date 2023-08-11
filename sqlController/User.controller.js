const { connection } = require('../config/sql.config');

exports.fetchAllusers = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;

    connection.query('SELECT * from users', (err, users) => {
      if (!err) {
        res.status(200).json(users);
      } else {
        res.status(400).json(err);
      }
    });
  });
};
exports.updateusers = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      'UPDATE users SET role = ? WHERE id = ?',
      [req.body.role, req.params.id],
      (err, users) => {
        if (!err) {
          res.status(200).json('Data updated successfully');
        } else {
          res.status(400).json(err);
        }
      }
    );
  });
};
