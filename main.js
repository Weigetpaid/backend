var express    = require("express");
var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'weigetpaid',
  password : 'heisgod',
  database : 'crikeydb'
});

var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );

app.get("/api/request", function(req, res) {

	pool.getConnection(function(err, connection) {
		if(!err) {
		    console.log("Database is connected ...\n");
		    console.log("Request GET");
			connection.query('SELECT * from requests', function(err, rows, fields) {
				res.send(rows);
				if (err) {
					console.log('Error while performing Query.');
				}
				connection.release();
			});
		} else {
		    console.log("Error connecting database ...\n");
		}
	});
	
});

app.get("/api/request/:number", function(req, res) {
	console.log("Request GET with number");
	pool.getConnection(function(err, connection) {
		if(!err) {
		    console.log("Database is connected ...\n");
		    connection.query('SELECT * from requests WHERE phone = \"' + req.param('number') + "\"", function(err, rows, fields) {
				res.send(rows);
				if (err) {
					console.log('Error while performing Query.');
				}
				connection.release();
			});
		} else {
		    console.log("Error connecting database ...\n");
		}
	});
	
});

app.post('/api/request', function (req, res) {
	pool.getConnection(function(err, connection) {
		if(!err) {
		    console.log("Database is connected ...\n");
		    if (req.is('JSON')) {
		      console.log("JSON Message");
		      var message = req.body;
			  var query = 'INSERT INTO requests (name, phone, lat, lng, descr, category, numpeople, timeestimate) VALUES (\'' + message.name + '\', ' + message.phone + ', ' + message.lat + ', ' + message.lng + ', \'' + message.desc + '\', \'' + message.category + '\', \'' + message.numpeople + '\', \'' + message.timeestimate + '\')';
			  
		      connection.query(query, function(err,res2) {
		        if(err) {
		        	console.log("There was a POST error");
			        return;
		        }
		        res.end();
		        console.log("Saved " + message.phone + " request for help");
		      });
		    } else {
			    console.log("NOT JSON");
		    }
		    connection.release();
		    
		} else {
		    console.log("Error connecting database ...\n");
		}
	});
});

app.listen(4000);
