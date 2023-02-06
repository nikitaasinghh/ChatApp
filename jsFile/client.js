const socket = io("http://localhost:8000");
const initbutton = document.getElementById("initBtn");

const subbutton = document.getElementById("btn");
const messageContainer = document.querySelector(".container");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("msgInpt");

var audio = new Audio("ting.mp3");

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

//  notification -- when someone joins

initbutton.addEventListener("click", (e) => {
    e.preventDefault(); //avoids reloading
    initbutton.style.display = "none";
    form.style.display = "block";
    messageInput.style.display = "block";
    subbutton.style.display = "block";
    console.log("hello");
});

form.addEventListener("submit", (e) => {
    e.preventDefault(); //avoids reloading
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
});

const append = (message, position) => {
    const msgElm = document.createElement("div");
    msgElm.innerText = message;
    msgElm.classList.add("message");
    msgElm.classList.add(position);
    messageContainer.append(msgElm);
    if (position == "left") {
        audio.play();
    }
};

socket.on("user-joined", (name) => {
    append(`${name} joined the chat`, "center");
});

socket.on("receive", (data) => {
    append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
    append(`${name} left the chat`, "center");
});
