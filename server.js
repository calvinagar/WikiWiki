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
const req = require('express/lib/request');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://group15:project415@cluster0.4epge.mongodb.net/largeProject?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  if (err)
  {
    console.log("Error connecting with database:\n" + err);
    client.close();
  }
});
const usersCollection = client.db("largeProject").collection("users");

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, email, error
 var error = '';
  const login = req.body.login;
  const password = req.body.password;
  const db = client.db("largeProject");
  const results = await 
  usersCollection.find({login:login,password:password}).toArray();
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
  var ret = { id:id, firstName:fn, lastName:ln, email:em, error:'' };
  res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => 
{
  // incoming: login, password, firstName, lastName, email
  // outgoing: id, error

  const login = req.body.login;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const db = client.db("largeProject");

  // check if there is already an account with that email
  const emailCheck = await db.collection('users').find({email:email}).toArray();
  if (emailCheck.length > 0)
  {
    var ret = { success:false, id:-1, error:'Someone has already registered with this email.'}
    return res.status(200).json(ret);
  }
  // check if there is already an account with that username
  const usernameCheck = await db.collection('users').find({login:login}).toArray();
  if (usernameCheck.length > 0)
  {
    var ret = { success:false, id:-1, error:'Someone has already registered with this username.'}
    return res.status(200).json(ret);
  }

  const insert = await 
  db.collection('users').insertOne(
    {
      login:login,
      password:password,
      firstName:firstName,
      lastName:lastName,
      email:email,
      playedGames:[]
    })

  result = false
  if( insert != null )
  {
    result = insert.acknowledged
  }
  var ret = { success:result, email:email, error:''};
  res.status(200).json(ret);
});

app.post('/api/sendVerificationEmail', async (req, res, next) =>
{
  // incoming: email
  // outgoing: code, error
  var email = req.body.email;

  const db = client.db("largeProject");
  const results = await 
  db.collection('users').find({email:email}).toArray();

  // if the email is not associated with an account, return with error
  if (results.length == 0)
  {
    var ret = { success:false, code:0, error:'Email not associated with an account.'}
    return res.status(200).json(ret);
  }
  
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

    let send = await transport.sendMail(mailOptions);

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

app.post('/api/sendPasswordResetEmail', async (req, res, next) =>
{
  // incoming: email
  // outgoing: code, error
  var email = req.body.email;

  const db = client.db("largeProject");
  const results = await 
  db.collection('users').find({email:email}).toArray();

  // if the email is not associated with an account, return with error
  if (results.length == 0)
  {
    var ret = { success:false, code:0, error:'Email not associated with an account.'}
    return res.status(200).json(ret);
  }
  
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
      subject: 'Password Reset Code', // subject
      text: 'Your password reset code is ' + code.toString() + '.'
      // html: '<b></b>' // html content
    };

    let send = await transport.sendMail(mailOptions);

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

app.post('/api/changePassword', async (req, res, next) =>
{
  // incoming: email, password (new password)
  // outgoing: error
  const email = req.body.email;
  const newPassword = req.body.password;
  const db = client.db("largeProject");
  const results = await 
  db.collection('users').updateOne(
    { email:email },
    { $set: { password:newPassword } }
  );
  
  var ret = { success:true, error:''};
  res.status(200).json(ret);
});

app.post('/api/getPlayedGames', async (req, res, next) => 
{
  // incoming: email
  // outgoing: list of games played
  var error = '';
  const email = req.body.email;
  const db = client.db("largeProject");
  const results = await 
  db.collection('users').find({email:email}).toArray();

  playedGames = []
  if( results != null)
  {
    playedGames = results[0].playedGames
  }
  else
  {
    var ret = { playedGames:playedGames, email:email, error:'No accounts found with this email.'};
    return res.status(200).json(ret);
  }

  var ret = { playedGames:playedGames, email:email, error:''};
  res.status(200).json(ret);
});

app.post('/api/addPlayedGame', async (req, res, next) => 
{
  // incoming: email, time, clicks
  // outgoing: list of games played
  var error = '';
  const email = req.body.email;
  const time = req.body.time;
  const clicks = req.body.clicks;
  
  const db = client.db("largeProject");
  const results = await 
  db.collection('users').updateOne(
    { email:email },
    { $push: { playedGames: { time: time, clicks: clicks} } },
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
  var ret = { success:acknowledged, matchCount:matchCount, modified:modified, email:email, error:''};
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

app.listen(5001); // start Node + Express server on port 5001s
