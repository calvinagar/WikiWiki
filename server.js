const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/wikiUsers';
const client = new MongoClient(url);
client.connect();

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
 var error = '';
  const { login, password } = req.body;
  const db = client.db();
  const results = await 
  db.collection('Users').find({Login:login,Password:password}).toArray();
  console.log(results)
  var id = -1;
  var fn = '';
  var ln = '';
  var em = '';
  
  if( results.length > 0 )
  {
    id = results[0]._id;
    fn = results[0].FirstName;
    ln = results[0].LastName;
    em = results[0].Email
  }
  var ret = { id:id, firstName:fn, lastName:ln, email:em ,error:''};
  res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => 
{
  // incoming: login, password, email, firstName, lastName
  // outgoing: id, firstName, lastName, error
 var error = '';
  const { login, password, firstName, lastName, email } = req.body;
  const db = client.db();
  const results = await 
  db.collection('Users').insertOne({Login:login,Password:password,FirstName:firstName,LastName:lastName,Email:email})

  result = false
  id = ''
  if( results != null)
  {
    result = results.acknowledged
    id = results.insertedId
  }
  var ret = { success:result, id:id, error:''};
  res.status(200).json(ret);
});

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});
app.listen(5000); // start Node + Express server on port 5000
