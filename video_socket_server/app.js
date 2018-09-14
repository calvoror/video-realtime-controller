let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let admin_array = [];
let client_array = {};

io.on('connection', (socket) => {
  // Log whenever a user connects
  console.log('user connected');

  // Log whenever a client disconnects from our websocket server
  socket.on('disconnect', function () {
    console.log('user disconnected');
    // Delete client from array on disconnection
    delete client_array[socket.id];

    admin_array.forEach(
      (admin) => {
        admin.emit('message', {type: 'client-disconnection', text: socket.id});
      }
    );
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on('message', (message) => {
    switch (message) {
      case 'ADMIN_CONN':
        console.log("Admin connected");
        socket.emit('message', {type: 'new-message', text: 'Hello Admin !'});
        admin_array.push(socket);
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
        console.log("Message Received: " + message);
        io.emit('message', {type: 'new-message', text: message});
        break;
    }
  });
});


// Initialize our websocket server on port 5000
http.listen(5000, () => {
  console.log('started on port 5000');
});
