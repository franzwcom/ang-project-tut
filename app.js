var express = require('express');
var app = express();

app.use(express.static(__dirname + '/')); // this is temporal
app.get('/', function (req, res) {
  res.sendfile('./index.html'); // this is temporal
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});