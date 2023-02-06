const socket = io("http://localhost:8000");
const button = document.getElementById("test");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

//  notification -- when someone joins

button.addEventListener("click", (e) => {
    e.preventDefault(); //avoids reloading
    console.log("hello");
    setTimeout(putForm, 1000);
    addEL();
});

async function putForm() {
    var str =
        '<form action="#" class="send-container">' +
        '<input type="text" name="msgInp" id="msgInpt" placeholder="We promise to keep it a secret..!!">' +
        '<button type="submit" class="btn">Send</button>' +
        "</form>";


    var Obj = document.getElementById("test"); 


    if (Obj.outerHTML) {
        Obj.outerHTML = str; 
    } 

}

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}

function addEL() {

    const form = document.getElementById("send-container");
    const messageInput = document.getElementById("msgInpt");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); //avoids reloading
        const message = messageInput.value;
        append(`You: ${message}`, "right");
        socket.emit("send", message);
        messageInput.value = "";
    });

}

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
