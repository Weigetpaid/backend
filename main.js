var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'weigetpaid',
  password : 'heisgod',
  database : 'crikeydb'
});
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );

connection.connect(function(err){
	if(!err) {
	    console.log("Database is connected ...\n");
	} else {
	    console.log("Error connecting database ...\n");
	}
});

app.get("/request", function(req, res) {
	console.log("Request GET");
	connection.query('SELECT * from requests', function(err, rows, fields) {
		res.send(rows);
		if (!err) {
			console.log('The solution is: ', rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});

app.get("/request/:number", function(req, res) {
	console.log("Request GET with number");
	connection.query('SELECT * from requests WHERE phone = \"' + req.param('number') + "\"", function(err, rows, fields) {
		res.send(rows);
		if (!err) {
			console.log('The solution is: ', rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});

app.post('/request', function (req, res) {
	if (req.is('JSON')) {
      console.log("JSON Message");
      var message = req.body;
	  var query = 'INSERT INTO requests (name, phone, lat, lng, descr, category, numpeople, timeestimate) VALUES (\'' + message.name + '\', ' + message.phone + ', ' + message.lat + ', ' + message.lng + ', \'' + message.desc + '\', \'' + message.category + '\', ' + message.numpeople + ', ' + message.timeestimate + ')';
	  
	  console.log(query);
      connection.query(query, function(err,res2){
        if(err) throw err;
        res.end();
        console.log("Saved " + message.phone + " request for help");
      });
    } else {
	    console.log("NOT JSON");
	    console.log(req.body);
    }
});

app.listen(4000);
