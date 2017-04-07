const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const awsClient = require('./awsClient');
const db = require('./mongodb');
const speechToTone = require('./speechToTone');

const app = express();

const appPort = process.env.PORT || 4000;

const analyzeCall = (key) => {
  return new Promise((fulfill, reject) => {
    db.find({ 'key': key }).then((dbData) => {
      if (dbData) {
        fulfill(dbData[0]);
      } else {
        /* awsClient.listCalls(key).then((result, err) => {
          console.log('Last Modified', result.Contents[0].LastModified);
          // console.log('all info', result);
        }) */
        awsClient.downloadCall(key).then((result, err) => {
          if (err) {
            reject(err);
          }
          console.log('Succeded in downloading call = ', result);
          speechToTone(result).then((data, error) => {
            if (error) {
              reject(error);
            }
            data.key = key;
            console.log(data);
            db.insertCallData(data);
            fulfill({ tone: data.tone, speech: data.speech });
          });
        });
      }
    });
  });
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/', (res) => {
  res.sendfile(path.join(__dirname, '/../public/index.html'));
});

app.post('/api/callData', (req, res) => {
  if (req.body.key !== undefined) {
    analyzeCall(req.body.key).then((data) => {
      res.send(data);
    });
  }

  if (req.body.keys !== undefined) {
    req.body.keys = req.body.keys.split(',');
    const analysis = [];

    req.body.keys.forEach((key) => {
      analysis.push(analyzeCall(key));
    });

    Promise.all(analysis).then((analysisComplete) => {
      res.send(analysisComplete);
    });
  }
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
