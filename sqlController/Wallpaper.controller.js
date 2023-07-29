const { connection } = require('../config/sql.config');
const fs = require('fs');

exports.fetchWallPapers = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from wallpaper', (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
        fs.writeFile('./myWallpaper.json', JSON.stringify(result), (err) => {
          if (err) console.log('Error writing file:', err);
        });
      } else {
        res.send(err);
      }
    });
  });
};

exports.createWallpaper = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('INSERT INTO wallpaper SET ?', req.body, (err, result) => {
      connection.release();

      if (!err) {
        res.send(req.body);
      } else {
        res.send(err);
      }
    });
  });
};
