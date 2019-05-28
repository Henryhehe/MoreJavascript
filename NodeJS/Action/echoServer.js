const net = require('net');s
const server = net.createServer(socket => {
    socket.on('data', data => {
        socket.write(data);
    });

    socket.once('data2', data2=> {
        socket.write(data2);
    })
});
server.listen(8888);

// run this code server by entering the following command 
// node echo_server.js
// connect to it by
// telnet 127.0.0.1 8888