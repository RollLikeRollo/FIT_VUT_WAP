require('dotenv').config();
var fs = require('fs');
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

// --- Defaults ---
const title = {
  title: 'Vulnerabilities Educational Website',
  subtitle: {
    index: 'Home',
    about: 'About',
    xss: 'XSS'
  }
};
const author = {
  name: 'Jan Zbořil',
  email: 'xzbori20@stud.fit.vutbr.cz'
  };
const school = 'Brno University of Technology, <br> Faculty of Information Technology';
const year = '2023';
const fitlogo = 'images/VUT-FIT-logo.png';

// --- Routes and views ---

// static files
app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/api', express.static(__dirname + '/api'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// --- METHODS ---
// --- Root ---

app.get('', (req, res) => { 
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
    // 'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  res.render('root', { title,author,school,year,fitlogo } );
});

// --- About ---

app.get('/about', (req, res) => { 
  res.render('about', { title,author,school,year,fitlogo });
});

// --- XSS ---

app.get('/xss', (req, res) => { 
  res.render('xss', { title,author,school,year,fitlogo });
});

// --- Clickjacking ---
app.get('/clickjacking', (req, res) => { 
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
    'Access-Security-Policy': '*'
  });
  res.render('clickjacking', { title,author,school,year,fitlogo});
});

app.post('/clickjacking',function(req,res){
  res.render('clickjacking', { title,author,school,year,fitlogo});
});

app.get('/api/list_users.js', (req, res) => { 
  
});


// --- CSRF ---

app.get('/csrf', (req, res) => { 
  res.render('csrf', { title,author,school,year,fitlogo });
});

// --- APP ---

app.listen(port, () => {
  console.info(`App listening on port ${port}!`);
});

module.exports = app;