const sockets = require('socket.io');
let io;

module.exports = function (server) {
  io = sockets();
  io.attach(server);

  io.on('connection', function(socket){

    console.log("Socket connected: " + socket.id);
    // socket.join('room 237', function(){
    //   console.log(socket.rooms); // [ <socket.id>, 'room 237' ]
    //   io.to('room 237', 'a new user has joined the room'); // broadcast to everyone in the room
    // });
    
    socket.on('action', (action) => {

      if (action.type === 'socket/hello'){
        console.log('Got hello data!', action.data);

        socket.emit('action', {type:'MESSAGE', data:'good day!'});
      }
      console.log(socket.rooms)
    });

  });
  return io;
}