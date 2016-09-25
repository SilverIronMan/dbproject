const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;

const app = express();

let appPort = 4000;

/* MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
});*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/', (res) => {
  res.sendfile(path.join(__dirname, '/../public/index.html'));
});

app.post('/quotes', (req) => {
  console.log(req.body);
});

if (process.env.VCAP_APP_PORT !== undefined) {
  appPort = process.env.VCAP_APP_PORT;
}

const server = app.listen(appPort, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log('App listening on http://localhost:', port);
});
