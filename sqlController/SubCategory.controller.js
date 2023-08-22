const { connection } = require('../config/sql.config');
const fs = require('fs');

exports.fetchAllSubCategories = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from subcategory', (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
        fs.writeFile('./mySubcategory.json', JSON.stringify(result), (err) => {
          if (err) console.log('Error writing file:', err);
        });
      } else {
        res.send(err);
      }
    });
  });
};

exports.createSubCategory = (req, res) => {
  const subcategories = req.body.subcategory ? JSON.parse(req.body.subcategory) : {};

  const image = req.file.buffer;

  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query(
      'INSERT INTO subcategory (subCategoryName, category, img, status) VALUES (?, ?, ?, ?)',
      [subcategories.categoryName, subcategories.category, image, subcategories.status],
      (err, result) => {
        connection.release();

        if (!err) {
          res.send('SubCategory data received and saved successfully!');
        } else {
          res.send(err);
        }
      }
    );
  });
};

exports.deleteSubCategory = async (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('DELETE FROM subcategory WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send('Data deleted successfully');
      } else {
        res.send(err);
      }
    });
  });
};
exports.fetchSubCategoryById = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from subcategory WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  });
};

exports.updateSubCategory = async (req, res) => {
  const { subcategory } = req.body.subcategory ? JSON.parse(req.body.subcategory) : {};
  const image = req.body.OldImage ? JSON.parse(req.body.OldImage).data : req.file.buffer;
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);
    if (!req.body.OldImage) {
      connection.query(
        'UPDATE subcategory SET subCategoryName = ?, category = ?, img = ?, status = ? WHERE id = ?',
        [subcategory.subCategoryName, subcategory.category, image, subcategory.status, req.params.id],
        (err, result) => {
          connection.release();

          if (!err) {
            res.send('Data updated successfully');
          } else {
            res.send(err);
          }
        }
      );
    } else {
      connection.query(
        'UPDATE subcategory SET subCategoryName = ?, category = ?, status = ? WHERE id = ?',
        [subcategory.subCategoryName, subcategory.category, subcategory.status, req.params.id],
        (err, result) => {
          connection.release();

          if (!err) {
            res.send('Data updated successfully');
          } else {
            res.send(err);
          }
        }
      );
    }
  });
};
