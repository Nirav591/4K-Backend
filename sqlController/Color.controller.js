const { connection } = require('../config/sql.config');
const fs = require('fs');

exports.fetchAllColors = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from color', (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
        fs.writeFile('./myColor.json', JSON.stringify(result), (err) => {
          if (err) console.log('Error writing file:', err);
        });
      } else {
        res.send(err);
      }
    });
  });
};
exports.deleteColor = async (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('DELETE FROM color WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send('Data deleted successfully');
      } else {
        res.send(err);
      }
    });
  });
};
exports.createColor = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('INSERT INTO color SET ?', req.body, (err, result) => {
      connection.release();

      if (!err) {
        res.send(req.body);
      } else {
        res.send(err);
      }
    });
  });
};
exports.fetchColorById = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from color WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  });
};

exports.updateColor = async (req, res) => {
  const { colorName, status } = req.body;
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query(
      'UPDATE color SET colorName = ?, status = ? WHERE id = ?',
      [colorName, status, req.params.id],
      (err, result) => {
        connection.release();

        if (!err) {
          res.send('Data updated successfully');
        } else {
          res.send(err);
        }
      }
    );
  });
};
