const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const env = require('../vars.env');

// File stream to allow for speech to text
const fs = require('fs');

const app = express();

const appPort = process.env.PORT || 4000;

const toneAnalyzer = new ToneAnalyzerV3({
  username: env.toneUser,
  password: env.tonePass,
  version_date: '2016-05-19',
});

// Credentials to use speech to text
const speechToText = new SpeechToTextV1({
  username: env.toneUser,
  password: env.tonePass,
});

// Paramater to use for speech to text
const params = {
  // From file
  audio: fs.createReadStream('/../hungry.wav'),
  content_type: 'audio/l16; rate=44100',
};

// Use our parameter to console log our converted text
/* We'll use what's below to post to our app
speechToText.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});

*/

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
