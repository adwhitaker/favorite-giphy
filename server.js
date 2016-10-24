var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var favorites = require('./routes/favorites');
var count = require('./routes/favCount');
var home = require('./routes/home');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/home', home);
app.use('/fav', favorites);
app.use('/count', count);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
