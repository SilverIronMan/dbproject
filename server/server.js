const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../public'));

app.get('/', (res, req) => {
  res.sendfile(__dirname + '/../public/index.html');
});

const server = app.listen(4000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening on http://%s:%s', host, port);
});
