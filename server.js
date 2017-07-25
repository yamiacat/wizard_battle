var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('client/build'));

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/client/build/index.html`);
});


io.on('connection', function(socket) {

  socket.on('attack', (attackDetails) => {
    io.sockets.emit('attack', attackDetails);
  });

  socket.on('broadcast', (broadcastDetails) => {
    io.sockets.emit('broadcast', broadcastDetails);
  });

  socket.on('scry', (scryDetails) => {
    io.sockets.emit('scry', scryDetails);
  });

});


var server = http.listen(3000, function () {

  console.log('Wizards only on http://localhost:3000/, fools.');
});
