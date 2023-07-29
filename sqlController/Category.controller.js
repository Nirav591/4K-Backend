const {connection} = require('../config/sql.config');
const fs = require('fs');

exports.fetchAllCategories = (req,res)=>{
  connection.getConnection((err, connection)=>{
    if(err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query("SELECT * from category", (err, result)=>{
      connection.release();

      if(!err){
        res.send(result)
        fs.writeFile('./myCategory.json', JSON.stringify(result), (err) => {
          if (err) console.log('Error writing file:', err);
        });
        
      } else{
        res.send(err);
      }
    })
  })
}

exports.createCategory = (req,res)=>{
  connection.getConnection((err, connection)=>{
    if(err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query("INSERT INTO category SET ?",req.body, (err, result)=>{
      connection.release();

      if(!err){
        res.send(req.body)
      } else{
        res.send(err);
      }
    })
  })
}