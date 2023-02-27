import express from 'express';
import "./loadEnvironment.mjs";
import fileDirName from './file_dir_name.mjs';
import db from './db_conn.mjs';
import cookieParser from 'cookie-parser';
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
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/api', express.static(__dirname + '/api'));
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

// --- SESSION ---
app.use(cookieParser());
app.use(session({
  secret: '9ZtMu3XMqzewa7vBLci66g6t',
  cookie: {
    maxAge: 60000,
    sameSite : 'strict'
  },
  resave: false
}));

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


// --- APP ---

app.listen(port, () => {
  console.info(`App listening on port ${port}!`);
});

export default app;