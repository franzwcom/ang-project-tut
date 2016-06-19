var express = require('express');
var app = express();

app.use(express.static(__dirname + '/')); // this is temporal
app.get('/', function (req, res) {
  res.sendfile('./index.html'); // this is temporal
});

var port = 3000;
app.listen(port, function () {
  console.log('Listening on http://localhost:3000/'+ port);
});