import express from 'express';
import fileDirName from './file_dir_name.mjs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import * as xss_stored from './xss_stored.mjs';
import session from 'express-session';

const { __dirname, __filename } = fileDirName(import.meta);

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

// email https://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript

app.get('/xss', (req, res) => { 
  res.render('xss', { title,author,school,year,fitlogo });
});

app.get('/xss_reflected', (req, res) => { 
  res.render('xss_reflected', { title,author,school,year,fitlogo });
});

app.get('/xss_reflected/frame', (req, res) => { 
  var search = req.query.search;
  var search_bar = req.query.search_bar;
  console.log(search);
  console.log(search_bar);
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_reflected_frame', { title,author,school,year,fitlogo,search_result:search,search_bar,full_url });
});

app.get('/xss_stored', (req, res) => { 
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_stored', { title,author,school,year,fitlogo,full_url });
});

app.get('/xss_stored/frame', (req, res) => { 
  var search = req.query.search;
  var search_bar = req.query.search_bar;
  // console.log(search);
  // console.log(search_bar);
  var random_string = xss_stored.reverseString(req.sessionID.substring(10, 18));
  res.cookie('sessionCookie', random_string, {path: '/xss_stored/frame' , httpOnly: false, secure: false });
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_stored_frame', { search_result: search, search_bar, full_url });
});

app.post('/xss_stored/frame', (req, res) => { 
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_stored_frame', {full_url});
});

app.get('/xss_stored/frame_attacker', (req, res) => { 
  var stolen = xss_stored.getStolenCookies();
  var sessionid = req.sessionID;
  var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('xss_stored_attacker', { title, full_url, stolen });
});

app.get('/api/xss_stored_reset', (req, res) => { 
  xss_stored.resetStolenCookies();
  console.log('Stolen cookies reset');
  res.status(200).send('Stolen cookies reset');
});

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

app.post('/xss_stored/xss_stored_add_comment', (req, res) => { 
  let comment = req.body;
  res.send(JSON.stringify(xss_stored.appendComment(comment)));
  console.log('Comment added');
  console.log(xss_stored.getComments());
});

app.get('/xss_stored/xss_stored_get_comments', (req, res) => { 
  res.send(JSON.stringify(xss_stored.getComments()));
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

app.get('/clickjacking/iframe', (req, res) => { 
  res.render('delete_user', { title,author,school,year,fitlogo });
});
app.get('/clickjacking/iframe_protected', (req, res) => { 
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none';")
  res.render('delete_user_protected', { title,author,school,year,fitlogo });
});

app.get('/clickjacking_protected', (req, res) => { 
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none';")
  res.render('clickjacking_protected', { title,author,school,year,fitlogo });
});


// --- CSRF ---

app.get('/csrf', (req, res) => { 
  res.render('csrf', { title,author,school,year,fitlogo });
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

// app.post('/api/drop_users', async (req, res) => { 
//   let collection = await db.collection(req.body.collection);
//   let result = await collection.drop();
//   res.send(result).status(204);
// });

app.get('/api/get_session', async (req, res) => { 
  res.send({ session: req.sessionID });
});

// app.get('/api/clickjack')


// --- APP ---

app.listen(port, () => {
  console.info(`App listening on port ${port}!`);
});

export default app;