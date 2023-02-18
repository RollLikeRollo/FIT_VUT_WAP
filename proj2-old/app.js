const express = require("express");


const app = express();
let port = 8000;

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
app.use('views', './views');
app.use('view engine', 'ejs');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('', (req, res) => { 
  res.render('index', { title,author,school,year,fitlogo } );
});

app.get('/about', (req, res) => { 
  res.render('about', { title,author,school,year });
});

app.get('/xss', (req, res) => { 
  res.render('xss', { title,author,school,year });
});



port = process.env.PORT || 8000;
app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`);
});