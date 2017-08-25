var http     = require('http'),
express  = require('express'),
mysql    = require('mysql')
parser   = require('body-parser');

// Database Connection
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'admin',
database : 'winvoice'
});
try {
connection.connect();

} catch(e) {
console.log('Database Connetion failed:' + e);
}


// Setup express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.set('port', process.env.PORT || 4000);

// Set default route
app.get('/', function (req, res) {
    res.send('<html><body><h1>WINVOICE -Simplifying Invoicing</h1></body></html>');
});


app.post('/invoice/create', function (req,res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' &&
		typeof req.body.email !== 'undefined' &&
		typeof req.body.date !== 'undefined'  &&
    typeof req.body.total !== 'undefined'
	) {
		var name = req.body.name, email = req.body.email, date = req.body.date, total = req.body.total;

		connection.query('INSERT INTO transactions (custName, custEmail, txn_date, totalAmt) VALUES (?, ?, ?, ?)',
			[name, email, date, total],
			function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

// Create server
http.createServer(app).listen(app.get('port'), function(){
console.log('Server listening on port ' + app.get('port'));
});
