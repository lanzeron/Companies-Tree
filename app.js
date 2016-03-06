var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'views')));

// conecting db and create a schema and a model


mongoose.connect('mongodb://localhost/companyDB');

var Schema = new mongoose.Schema({
	 name: {
	 	type: String,
	 	unique: true
	 },
	 estimated: Number,
	 parent: String
});

var company = mongoose.model('companylist', Schema);


app.get('/', function (req, res) {
	res.render('index');
});

app.get('/data', function (req, res) {
	company.find({}, function (err, data) {
		if (err) {res.json(err);
		} else  res.send(data)
		});
	
	
});



app.get('/view', function (req, res) {
	company.find({}, function (err, docs) {
		if (err) {
			res.json(err);
		} else {
			res.render('index', {
				company:docs
			});
		}
	});
});

app.get('/delete', function (req, res) {
	
	company.remove({name:req.query.companys}, function (err, doc){
		if (err) {
		res.json(err);
		} else {res.redirect('/view');
		}
	});
});

app.get('/edit', function (req, res) {
	company.update({name:req.query.companys},
				{ $set: {
					name:req.query.editName,
					estimated:req.query.editEstimate
				}
				}, function (err, data){
					if (err) {
						res.json(err);
					} else res.redirect('/view');
				});
	// company.update({parent:req.query.companys},
	// 			{ $set: {
	// 				parent:req.query.editName
	// 			}
	// 			}, function (err, data) {
	// 				if (err) {
	// 					res.json(err);
 // 					} else res.redirect('/view');
		

	// 			});
				
});


app.post('/new', function (req, res){
	new company({
		name:req.body.name,
		estimated:req.body.estimated
	}).save(function (err, docs) {
		if (err) {
			throw err;
		} else {res.redirect('/view');}
	});
});

app.post('/child', function (req, res){
	new company({
		name:req.body.childName,
		estimated:req.body.childEstimate,
		parent:req.body.companyList
	}).save(function (err, docs) {
		if (err) {
			res.json(err);
		} else {res.redirect('/view');}
	});
});




app.listen(3000, function (){
	console.log('server started on 3000 port');
});