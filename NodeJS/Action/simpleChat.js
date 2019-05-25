// use publish/subscribe logic by using EventEmitter to make a communication channel 
const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
const myEmitter = new events.EventEmitter();

myEmitter.on('error', err => {
    console.log(`ERROR: ${err.message}`);
});

myEmitter.emit('error', new Error('Something is wrong'));

channel.clients = {};
channel.subscriptions = {};
channel.setMaxListeners(50);
channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) =>{
        if(id !=senderId) {
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
})

channel.on('leave', function(id) {
    channel.removeListener(
        'broadcast', this.subscriptions[id]
    );
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});

channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'the server is shutdown');
    channel.removeAllListeners('broadcast');
})

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    // emits a join event when a user connects 
    // to the server, specifying the user ID and client objec
    channel.emit('join', id, client);
    client.on('data', data => {
        data = data.toString();
        if (data === 'shutdown\r\n'){
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });
    client.on('close', () => {
        channel.emit('leave', id);
    });
});
// telnet 127.0.0.1 888
server.listen(8888)
