const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/callsdb';

const dbModule = {};

insertCallData = (callData) => {
  // Use connect method to connect to the Server
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      // Get the documents collection
      const collection = db.collection('calls');

      // Insert some users
      collection.insert(callData, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        db.close();
      });
    }
  });
};

dbModule.insertCallData = insertCallData;

find = () => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      const collection = db.collection('calls');

      collection.find().toArray((error, result) => {
        if (error) {
          console.log(error);
        } else if (result.length) {
          console.log('Found:', result);
        } else {
          console.log('No document(s) found with defined "find" criteria!');
        }
      });
    }
  });
};

dbModule.find = find;

module.exports = dbModule;
