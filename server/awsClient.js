const AWS = require('aws-sdk');
const fs = require('fs');
const env = require('../vars.env');

const s3 = new AWS.S3();

const awsModule = {};

listCalls = (filter) => {
  const params = {
    Bucket: env.bucket,
    Prefix: filter,
  };

  return new Promise((fulfill, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        fulfill(data);
      }
    });
  });
};

awsModule.listCalls = listCalls;

downloadCall = (callKey) => {
  const params = {
    Bucket: env.bucket,
    Key: callKey,
  };

  return new Promise((fulfill, reject) => {
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
};

awsModule.downloadCall = downloadCall;

module.exports = awsModule;
