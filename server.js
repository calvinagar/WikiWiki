const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectID } = require('bson');
const app = express();
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
app.use(cors());
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/wikiUsers';
const client = new MongoClient(url);
client.connect();

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, email, error
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
  // incoming: login, password, firstName, lastName, email
  // outgoing: id, error
 var error = '';
  const { login, password, firstName, lastName, email } = req.body;
  const db = client.db();
  const results = await 
  db.collection('Users').insertOne(
    {
      Login:login,
      Password:password,
      FirstName:firstName,
      LastName:lastName,
      Email:email,
      PlayedGames:[]
    })

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

app.post('/api/sendVerificationEmail', async (req, res, next) =>
{
  // incoming: emails
  // outgoing: code, error
  var email = req.body.email;
  
  if (email && emailValidator.validate(email))
  {
    // generate a random 5-digit code
    var code = Math.floor(Math.random() * 90000) + 10000;

    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "thewikiwikigame@gmail.com",
        pass: "WikiWikiEmail"
      }
    });

    const mailOptions = {
      from: '"WikiWiki" <thewikiwikigame@gmail.com>', // sender's email
      to: email, // recipient
      subject: 'Email Verification Code', // subject
      text: 'Your verification code is ' + code.toString() + '.'
      // html: '<b></b>' // html content
    };

    let info = await transport.sendMail(mailOptions);

    var ret = { success:true, code:code, error:''};
    res.status(200).json(ret);
  }
  else
  {
    if (email)
    {
      var ret = { success:false, code:0, error:'email is invalid'}
      res.status(200).json(ret);
    }
    else
    {
      var ret = { success:false, code:0, error:'email is null'}
      res.status(200).json(ret);
    }
  }
});

app.post('/api/getPlayedGames', async (req, res, next) => 
{
  // incoming: playerID
  // outgoing: list of games played
  var error = '';
  const { id } = req.body;
  const db = client.db();
  const results = await 
  db.collection('Users').find({_id: ObjectID(id)}).toArray();

  PlayedGames = []
  if( results != null)
  {
    PlayedGames = results[0].PlayedGames
  }

  var ret = { PlayedGames:PlayedGames, id:id, error:''};
  res.status(200).json(ret);
});

app.post('/api/addPlayedGame', async (req, res, next) => 
{
  // incoming: playerID
  // outgoing: list of games played
  var error = '';
  const { id, time, clicks} = req.body;
  
  const db = client.db();
  const results = await 
  db.collection('Users').updateOne(
    { _id: ObjectID(id) },
    { $push: { PlayedGames: { time: time, clicks: clicks} } },
  );

  acknowledged = false
  matchCount = 0
  modified = 0
  if( results != null)
  {
    acknowledged = results.acknowledged
    matchCount = results.matchedCount
    modified = results.modifiedCount
  }
  var ret = { success:acknowledged, matchCount:matchCount, modified:modified, id:id, error:''};
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
app.listen(5001); // start Node + Express server on port 5000
