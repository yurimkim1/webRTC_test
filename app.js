const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/host',function(req, res) {
    res.sendFile(__dirname + '/streaming.html');
});

app.get('/recv',function(req, res) {
    res.sendFile(__dirname + '/watch.html');
});

io.sockets.on('connection', function(socket){

    console.log("현재접속자id: ", socket.id);

    socket.on('channelname', function(myChannelId){
        console.log("방장이보내온 채널id: ", myChannelId);

        io.emit('channelnametowatch', myChannelId);
    })
})

http.listen(2002, function(){//포트 2002에서 수신 대기중
    console.log('listening on *:2002');
  });