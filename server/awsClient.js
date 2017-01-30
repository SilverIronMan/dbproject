const AWS = require('aws-sdk');
const fs = require('fs');
const env = require('../vars.env');

const s3 = new AWS.S3();

const awsModule = {};
// '2017/01/18/'
listCalls = (day) => {
  const params = {
    Bucket: env.bucket,
    Prefix: day,
  };

  return new Promise((fulfill, reject) => {
    s3.listObjects(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        fulfill(data);
      }
    });
  });
}

awsModule.listCalls = listCalls;

downloadCall = (callKey) => {
  const params = {
    Bucket: env.bucket,
    Key: callKey,
  };

  return new Promise((fulfill, reject) => {
    console.log(params.Key)
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        fs.writeFile('./server/audio/' + data.LastModified + '.WAV', data.Body, (err) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          fulfill('audio/' + data.LastModified + '.WAV');
        });
      }
    });
  });
}

awsModule.downloadCall = downloadCall;

module.exports = awsModule;
