const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgInpt');
const messageContainer = document.querySelector('.container');


var audio = new Audio('ting.mp3');

//  notification -- when someone joins
const append = (message, position) => {
    const msgElm = document.createElement('div')
    msgElm.innerText = message;
    msgElm.classList.add('message');
    msgElm.classList.add(position);
    messageContainer.append(msgElm);
    if (position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();    //avoids reloading
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})



const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'center')
})