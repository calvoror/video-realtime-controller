let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200', 'http://localhost:8080', 'http://localhost']
  }
});

const SERVER_PORT = 9000

let admin_array = [];
let client_array = {};

io.on('connection', (socket) => {
  // Log whenever a user connects
  console.log('user connected');

  socket.emit('message', {type: 'identification'});

  // Log whenever a client disconnects from our websocket server
  socket.on('disconnect', function () {
    console.log('user disconnected');
    // Delete client from array on disconnection

    if (client_array[socket.id]) {
      delete client_array[socket.id];

      admin_array.forEach(
        (admin) => {
          admin.emit('message', {type: 'client-disconnection', text: socket.id});
        }
      );
    }
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on('message', (message) => {
    switch (message.type) {
      case 'videourl':
        admin_array.forEach(
          (admin) => {
            admin.emit('message', {type: 'client-video-selected', client: socket.id, video: message.text});
          }
        );
        break;
      case 'ping-client':
        console.log('message received : ping client');

        if (client_array[message.text]) {
          client_array[message.text].emit('message', {type:'new-message', text: 'PLOP'});
        }
        break;
      case 'client-state':
        admin_array.forEach(
          (admin) => {
            admin.emit('message', {type: 'client-video-fullscreen', client: socket.id, state: message.text});
          }
        );
        break;
      case 'ADMIN_CONN':
        console.log("Admin connected");
        socket.emit('message', {type: 'new-message', text: 'Hello Admin !'});
        admin_array.push(socket);

        for (var client_id in client_array) {
          if (client_array.hasOwnProperty(client_id)) {
            socket.emit('message', {type: 'client-connection', text: client_id});
          }
        }
        break;
      case 'CLIENT_CONN':
        console.log("Client connected");
        socket.emit('message', {type: 'new-message', text: 'Hello Client !'});
        // Add the client to client_array
        client_array[socket.id] = socket;
        // Send client id back to client
        socket.emit('message', {type: 'client-id', text: socket.id});

        admin_array.forEach(
          (admin) => {
            admin.emit('message', {type: 'client-connection', text: socket.id});
          }
        );
        break;
      default:
        // In all cases, we dispatch the received messages to everyone connected
        console.log("Message Received: " + message.text);
        io.emit('message', {type: 'new-message', text: message.text});
        break;
    }
  });
});


// Initialize our websocket server on port $SERVER_PORT
http.listen(SERVER_PORT, () => {
  console.log('started on port '  + SERVER_PORT);
});
