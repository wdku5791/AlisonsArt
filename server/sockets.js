const sockets = require('socket.io');
const model = require('./database/queries');
const fork = require('child_process').fork;
let io;

module.exports = {
  engine: function () {
    return io;
  },

  init: function (server) {
    io = sockets();
    io.attach(server);
    var socketList = {};
    // var worker = fork(__dirname + '/worker.js');
    // worker.on('message', function(response) {
    //   if (response.type === 'notification') {
    //   console.log(response, 'closed auctions notifications');
    //     response.data.forEach((notification) => {
    //       if (socketList[notification.owner_id]) {
    //         console.log('emission occurs', notification.owner_id);
    //         socketList[notification.owner_id].emit('action', {type: 'MESSAGE', data: notification});
    //       }
    //     })
    //   } else if (response.type === 'error') {
    //     console.log('error with worker')
    //     io.emit('action', {type: 'ERROR_SOCKET', data: response.data});
    //   } else if (response.type === 'closed') {
    //     console.log('closed', response.data);
    //     io.emit('action', {type: 'MESSAGE', data: response.data});
    //   }
    // });

    io.on('connection', function(socket){
      // console.log('ioengine', io);
      console.log("Socket connected: " + socket.id);
      console.log('number of sockets', io.eio.clientsCount);
      // socket.join('room 237', function(){
      //   console.log(socket.rooms); // [ <socket.id>, 'room 237' ]
      //   io.to('room 237', 'a new user has joined the room'); // broadcast to everyone in the room
      // });
      
      socket.on('action', (action) => {

        if (action.type === 'socket/hello'){

          console.log('Got hello data!', action.data);
          socket.emit('action', {type:'MESSAGE', data:'good day!'});

        }

        if (action.type === 'socket/LOGOUT'){

          console.log('Got signout data!', action.data);
          socket.emit('action', {type:'MESSAGE', data:'logged out!'});
          socket.emit('action', {type:'socket/LOGOUT_COMPLETE', data: null});
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
            socketList[action.data] = socket;
            // console.log(socketList, 'socketList');
            socket.emit('action', {type:'MESSAGE', data: 'rooms joined'});
          })
          .catch((error) => {
            console.log('error in room join', error)
            socket.emit('action', {type:'ERROR_SOCKET', data: error});
          });
        }
      });

    });
    return io;
  },
};
