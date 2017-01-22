const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const awsClient = require('./awsClient');
const db = require('./mongodb');
const speechToTone = require('./speechToTone');

const app = express();

const appPort = process.env.PORT || 4000;

let toneData;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/', (res) => {
  res.sendfile(path.join(__dirname, '/../public/index.html'));
});

app.post('/quotes', (req, res) => {
  speechToTone().then((data) => {
    toneData = data;
    res.sendFile(path.join(__dirname, '/../public/quotes.html'));
  });
});

app.get('/tonedata', (req, res) => {
  // db.insertCallData(toneData);
  res.send(toneData.tone);
});

app.get('/listCalls', (req, res) => {
  awsClient.listCalls().then((data) => {
    res.send(data);
  })
});

// db.find();

const server = app.listen(appPort, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log('App listening on http://localhost:', port);
});
