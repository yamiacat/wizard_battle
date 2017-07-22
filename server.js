var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {

  console.log('Wizards only on http://localhost:3000/, fools.');
});
