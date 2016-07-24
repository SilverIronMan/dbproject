const express = require('express');
const app = express();

let appPort = 4000;

app.use(express.static(__dirname + '/../public'));

app.get('/', (res) => {
  res.sendfile(__dirname + '/../public/index.html');
});

if (process.env.VCAP_APP_PORT !== undefined) {
  appPort = process.env.VCAP_APP_PORT;
}

const server = app.listen(appPort, () => {
  const port = server.address().port;
  // eslint-disable-next-line no-console
  console.log('App listening on http://localhost:', port);
});
