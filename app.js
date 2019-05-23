const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// check for db connection
db.once('open', function(){
  console.log('>>> Connected to DB.');
});
// check for db errs
db.on('error', function(err){
  console.log('!!! DB error: '+err);
});

// initialize the app
const app = express();

// bring in the models
let Lead = require('./models/lead');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser middleware
// body parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// list view & create view form
app.get('/', function(req, res){
  Lead.find({}, function(err, leadlist){
    if(err) {console.log(err)}
    else {
      res.render('index', {
        title: 'Leads',
        leadlist: leadlist
      });
    }
  });
});

// create view post
app.post('/', function(req, res){
	let leadobj = new Lead();
	leadobj.client =  req.body.client;
	leadobj.value = req.body.value;
	leadobj.save(function(err){
		if(err) {
			console.log(err);
		}
		else{
			res.redirect('/')
		}
	});
});

// detail view
app.get('/lead/:id', function(req, res){
	Lead.findById(req.params.id, function(err, leaddetail){
		res.render('lead', {
			title: leaddetail.client,
		    leaddetail: leaddetail
		});
	})
});

// update view form
app.get('/lead/edit/:id', function(req, res){
	Lead.findById(req.params.id, function(err, leadedit){
		res.render('edit', {
			title: 'Updating '+leadedit.client,
		    leadedit: leadedit
		});
	})
})

// update view post
app.post('/lead/edit/:id', function(req, res){
	let leadobj = {};
	leadobj.client =  req.body.client;
	leadobj.value = req.body.value;

	let query = {_id:req.params.id}
	Lead.update(query, leadobj, function(err){
		if(err) {
			console.log(err);
		}
		else{
			res.redirect('/')
		}
	});
});

// delete view
app.delete('/lead/:id', function(req, res){
	let query = {_id:req.params.id}
	Lead.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	})
});

app.get('/add', function(req, res){
  // res.send('Kemon achho?');
  res.render('add', {
    title: 'New Lead'
  });
});

app.listen(3000, function(){
  console.log('server started on port 3000')
});
