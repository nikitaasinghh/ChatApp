// //Node Server for socket.io
// const io=require('socket.io')(8000)
// const users={}
// // let cors = require("cors");
// // app.use(cors());
// // io = require("socket.io")(httpServer, {
// //     cors: {
// //       origin: "http://localhost:8000",
// //       methods: ["GET", "POST"]
// //     }
// //   });

// io.on('connection',socket =>{ //Socket.io instance that will listen to socket connections like x connected etc..

//     //1st event
//     socket.on('new-user-joined',name =>{ //"what will happen to a particular connection" is handled by socket.on
//         console.log("New user",name);
//         users[socket.id]=name;  //Socket.id is a key given to each user
//         socket.broadcast.emit('user-joined',name);    //emits to all other users except the one who joined
//     }
    
//     );

//     // 2nd event 
//     socket.on('send',message =>{
//         console.log("nikita")
//         socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
        
//     })

//     socket.on('disconnect', message =>{
//       socket.broadcast.emit('left', users[socket.id]);
//       delete users[socket.id];
//   });
// })

// Node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        console.log("new user",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})