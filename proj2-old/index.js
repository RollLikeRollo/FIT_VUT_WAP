require('dotenv').config();
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

// vars
const title = {
  title: 'Vulnerabilities Educational Website',
  subtitle: {
    index: 'Home',
    about: 'About',
    xss: 'XSS'
  }
};
const author = 'Jan Zbořil';
const school = 'Brno University of Technology, <br> Faculty of Information Technology';
const year = '2023';
const fitlogo = 'images/VUT-FIT-logo.png';


// static files
app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/images', express.static(__dirname + '/public/images'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => { 
  res.render('root', { title,author,school,year,fitlogo } );
});

app.get('/about', (req, res) => { 
  res.render('about', { title,author,school,year });
});

app.get('/xss', (req, res) => { 
  res.render('xss', { title,author,school,year });
});


app.listen(port, () => {
  console.info(`App listening on port ${port}!`);
});

module.exports = app;