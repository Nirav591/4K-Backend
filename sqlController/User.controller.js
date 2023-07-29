const {connection} = require('../config/sql.config');

exports.fetchAllusers = (req,res)=>{
  connection.getConnection((err, connection)=>{
    if(err) throw err;

    connection.query('SELECT * from users', (err, users)=>{
      if(!err){
        res.status(200).json(users);
      } else {
        res.status(400).json(err);
      }
    })
  })
}