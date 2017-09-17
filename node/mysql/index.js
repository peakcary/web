var mysql = require('mysql');

var connection = mysql.createConnection({host: '127.0.0.1', user: 'root', password: '123456', port: '3306', database: 'mydb'});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

var  sql = 'SELECT * FROM myTable';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();