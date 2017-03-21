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
  const bodyKey = req.body.key;
  db.find({ 'key': bodyKey }).then((dbData) => {
    if (dbData) {
      console.log('sending', dbData.length, 'entries');
      console.log('data => ', dbData);
      res.send(dbData[0]);
    } else {
      console.log('no db entry', dbData);
      awsClient.downloadCall(req.body.key).then((result, err) => {
        if (err) {
          console.log(err);
        }
        console.log('Succeded in downloading call = ', result);
        speechToTone(result).then((data, error) => {
          if (error) {
            res.send(error);
          }
          console.log('sending the tone data');
          toneData = data;
          toneData.key = req.body.key;
          console.log(toneData);
          db.insertCallData(toneData);
          res.send({ tone: toneData.tone, speech: toneData.speech });
        });
      });
    }
  });
  console.log('body key =>', bodyKey);
});

app.post('/api/testCallDataWatson', (req, res) => {
  speechToTone('audio/Fri, 22 Jul 2016 15:10:24 GMT.WAV').then((data) => {
    console.log('sending the tone data');
    toneData = data;
    res.send(toneData.tone);
  });
});

app.get('/api/toneData', (req, res) => {
  res.send(toneData.tone);
});

app.post('/api/listCalls', (req, res) => {
  awsClient.listCalls(req.body.filter).then((data) => {
    res.send(data);
  });
});

// db.drop();
// db.find().then((data) => { console.log(data); });

const server = app.listen(appPort, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log('App listening on http://localhost:', port);
});
