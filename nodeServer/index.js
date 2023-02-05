//Node Server for socket.io
const io = require('socket.io')(8000)
const users = {}


io.on('connection', socket => { //Socket.io instance that will listen to socket connections like x connected etc..
    //1st event
    socket.on('new-user-joined', name => { //"what will happen to a particular connection" is handled by socket.on
        users[socket.id] = name;  //Socket.id is a key given to each user
        socket.broadcast.emit('user-joined', name);    //emits to all other users except the one who joined
    }

    );

    // 2nd event 
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });

    })

    socket.on("disconnect", name => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})

