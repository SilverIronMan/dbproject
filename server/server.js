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

app.post('/api/callData', (req, res) => {
  console.log('body key = ', req.body.key);
  awsClient.downloadCall(req.body.key).then((result, err) => {
    console.log('Succeded in downloading call = ', result);
    speechToTone(result).then((data, error) => {
      if (error) {
        res.send(error);
      }
      console.log('sending the tone data');
      toneData = data;
      res.send(toneData.tone);
    });
  });
});

app.post('/api/testCallDataWatson', (req, res) => {
  speechToTone('audio/Fri, 22 Jul 2016 15:10:24 GMT.WAV').then((data) => {
    console.log('sending the tone data');
    toneData = data;
    res.send(toneData.tone);
  });
});

app.get('/api/toneData', (req, res) => {
  // db.insertCallData(toneData);
  res.send(toneData.tone);
});

app.post('/api/listCalls', (req, res) => {
  awsClient.listCalls(req.body.filter).then((data) => {
    res.send(data);
  });
});

// db.find();

const server = app.listen(appPort, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log('App listening on http://localhost:', port);
});
