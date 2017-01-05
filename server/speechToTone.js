const path = require('path');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');

const env = require('../vars.env');

// Auth for Tone
const toneAnalyzer = new ToneAnalyzerV3({
  username: env.toneUser,
  password: env.tonePass,
  version_date: '2016-05-19',
});

// Auth for speech to text
const speechToText = new SpeechToTextV1({
  username: env.speechToTextUser,
  password: env.speechToTextPass,
});

const speechToTextParams = {
  content_type: 'audio/wav',
};

module.exports = () => {
  return new Promise((fulfill, reject) => {
    // create the stream
    const recognizeStream = speechToText.createRecognizeStream(speechToTextParams);

    // pipe in some audio
    fs.createReadStream(path.join(__dirname, '/../hungry.wav')).pipe(recognizeStream);

    // and pipe out the transcription
    recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
    recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

    let speech = '';
    ['data', 'error', 'close'].forEach((eventName) => {
      // Console.log(everything);
      recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));

      recognizeStream.on(eventName, (event) => {
        // Save the data
        if (eventName === 'data') {
          speech += event;
        }

        // If or the stream ends or the error is the file is too long, send it to tone
        if ((eventName === 'close') || (eventName === 'error' &&
          event.Reason === 'Payload exceeds the 104857600 bytes limit.')) {
          toneAnalyzer.tone({ text: speech },
            (err, tone) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                console.log(JSON.stringify(tone, null, 2));
                fulfill({ tone, speech });
              }
            });
        }
      });
    });
  });
};
