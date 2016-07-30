var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'weigetpaid',
  password : 'heisgod',
  database : 'crikeydb'
});
var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ...\n");
} else {
    console.log("Error connecting database ...\n");
}
});

app.get("/",function(req,res){
connection.query('SELECT * from requests', function(err, rows, fields) {
connection.end();
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });
});

app.listen(3000);
