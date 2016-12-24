const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('./env');
const ToneAnalyzerV3 = require('./tone-analyzer/v3');

const app = express();


var tone_analyzer = new ToneAnalyzerV3({
  username: env.toneUser,
  password: env.tonePass,
  version_date: '2016-05-19'
});

console.log(__dirname);

let appPort = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/', (res) => {
  res.sendfile(path.join(__dirname, '/../public/index.html'));
});

app.post('/quotes', (req) => {
  tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
    function(err, tone) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(tone, null, 2));
      }
  });
});

if (process.env.VCAP_APP_PORT !== undefined) {
  appPort = process.env.VCAP_APP_PORT;
}

const server = app.listen(appPort, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log('App listening on http://localhost:', port);
});
