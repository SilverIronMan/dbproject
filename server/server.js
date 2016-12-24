const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('./env');
const ToneAnalyzerV3 = require('./tone-analyzer/v3');

const app = express();

const appPort = process.env.PORT || 4000;

const toneAnalyzer = new ToneAnalyzerV3({
  username: env.toneUser,
  password: env.tonePass,
  version_date: '2016-05-19',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/', (res) => {
  res.sendfile(path.join(__dirname, '/../public/index.html'));
});

app.post('/quotes', () => {
  toneAnalyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
    (err, tone) => {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(tone, null, 2));
      }
    });
});

const server = app.listen(appPort, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log('App listening on http://localhost:', port);
});
