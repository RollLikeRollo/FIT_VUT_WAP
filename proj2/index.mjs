import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileDirName from './server_scripts/file_dir_name.mjs';
import * as xss_stored from './server_scripts/xss_stored.mjs';
import * as csrf_storage from './server_scripts/csrf_storage.mjs';
import session from 'express-session';

const { __dirname } = fileDirName(import.meta);

const app = express();
const port = process.env.PORT || 8000;

// --- Defaults ---
const title = {
  title: 'Vulnerabilities Educational Website',
  subtitle: {
    index: 'Home',
    about: 'About',
    xss: 'XSS',
    csrf: 'CSRF',
    clickjacking: 'Clickjacking',
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
app.use('/data', express.static(__dirname + '/public/data'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/api', express.static(__dirname + '/api'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/index', express.static(__dirname + '/'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.text());
app.use(bodyParser.json());
// app.use(bodyParser.raw());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'awfbjawf1246fjhszbf7823576823',
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  resave: false
}));


// --- SESSION ---
app.use(cookieParser());

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

/**
 * render the xss selector view
 */
app.get('/xss', (req, res) => { 
  res.render('xss', { title,author,school,year,fitlogo });
});

/**
 * render the xss reflected view
 */
app.get('/xss_reflected', (req, res) => { 
  res.render('xss_reflected', { title,author,school,year,fitlogo });
});

/**
 * Render the xss reflected frame view with the search bar
 */
app.get('/xss_reflected/frame', (req, res) => { 
  var search = req.query.search;
  var search_bar = req.query.search_bar;
  console.log(search);
  console.log(search_bar);
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_reflected_frame', { title,author,school,year,fitlogo,search_result:search,search_bar,full_url });
});

/**
 * Render the xss stored view
 */
app.get('/xss_stored', (req, res) => { 
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_stored', { title,author,school,year,fitlogo,full_url });
});

/**
 * Render the xss stored frame view the example-cookie
 * is set as modified session id
 */
app.get('/xss_stored/frame', (req, res) => { 
  var search = req.query.search;
  var search_bar = req.query.search_bar;
  var pseudo_cookie = xss_stored.reverseString(req.sessionID.substring(10, 18));
  res.cookie('sessionCookie', pseudo_cookie, {path: '/xss_stored/frame' , httpOnly: false, secure: false });
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_stored_frame', { search_result: search, search_bar, full_url });
});

/**
 * Render the xss stored frame attacker view
 */
app.get('/xss_stored/frame_attacker', (req, res) => { 
  var stolen = xss_stored.getStolenCookies();
  var sessionid = req.sessionID;
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_stored_attacker', { title, full_url, stolen });
});

/**
 * Render the xss stored frame after the RESET is pressed
 */
app.get('/api/xss_stored_reset', (req, res) => { 
  xss_stored.resetStolenCookies();
  res.status(200).send('Stolen cookies reset');
});

/**
 * Post stolen cookies to the attcker view
 */
app.post('/xss_stored/frame_attacker', (req, res) => {
  var body = req.body;
  var sessionid = req.sessionID;

  if (body != null && body != undefined && body != '') { 
    xss_stored.appendStolenCookies(body);
  } else {
    res.status(304).send('Faulty data');
  }
  var stolen = xss_stored.getStolenCookies();
  res.status(205).render('xss_stored_attacker', { title, stolen });
  
});


// --- Clickjacking ---

/**
 * Render the clickjacking view
 */
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

app.get('/clickjacking/iframe', (req, res) => { 
  res.render('delete_user', { title,author,school,year,fitlogo });
});

/**
 * Render the protceted clickjacking view
 */
app.get('/clickjacking/iframe_protected', (req, res) => { 
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none';")
  res.render('delete_user_protected', { title,author,school,year,fitlogo });
});

app.get('/clickjacking_protected', (req, res) => { 
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none';")
  res.render('clickjacking_protected', { title,author,school,year,fitlogo });
});


// --- CSRF ---

/**
 * CSRF main page
 */
app.get('/csrf', (req, res) => { 
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl + '/vulnerable';
  res.render('csrf/csrf', { title,author,school,year,fitlogo, full_url });
});

/**
 * CSRF vulnerable frame
 */
app.post('/csrf/vulnerable', (req, res) => {
  var to = req.body.recipient;
  var amount = req.body.amount;
  csrf_storage.addTransfer(req.sessionID, amount, to);
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('csrf/vulnerable', { full_url });
});


app.get('/csrf/vulnerable', (req, res) => {
  console.log(csrf_storage.getTransfers(req.sessionID));
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('csrf/vulnerable', { full_url });
});

app.get('/api/transfers', (req, res) => {
  var transfers = csrf_storage.getTransfers(req.sessionID);
  console.log(transfers);
  res.send(JSON.stringify(transfers)).status(200);
});


/**
 * CSRF malicious frame
 */
app.get('/csrf/malicious', (req, res) => {
  res.render('csrf/malicious',);
});


// --- API ---

app.get('/api/list_users', async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

app.post('/api/add_user', async (req, res) => { 
  let collection = await db.collection("users");
  
  let users = await collection.find(req.body).toArray();
  if (users.length > 0) { 
    res.send({ 'err': ' User already exists' }).status(400);
    return;
  }

  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});



// --- APP ---

app.listen(port, () => {
  console.info(`App listening on port ${port}!`);
});

export default app;