const sockets = require('socket.io');
const model = require('./database/queries');
let io;

module.exports = {
  engine: function () {
    return io;
  },

  init: function (server) {
    io = sockets();
    io.attach(server);
    io._list = [];
    io.on('connection', function(socket){
      // console.log('ioengine', io);
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
        if (action.type === 'socket/LOGIN'){

          console.log('Got login data!', action.data);
          model.getUserAuctions(action.data)
          .then((results) => {
            var rooms = results.map(function(room) {
              return 'room:' + room.id;
            });
            rooms.push('room:all');
            rooms.forEach(function(room) {
              socket.join(room, function() {
                // room joining function
                console.log(socket.id, ' joined room ', room)
              });
            })
            console.log(socket)
            socket.emit('action', {type:'MESSAGE', data: 'rooms joined'});
          })
          .catch((error) => {
            console.log('error in room join', error)
            // socket.emit('action', {type:'MESSAGE', data: error});
          });
        }
      });

    });
    return io;
  },
};
