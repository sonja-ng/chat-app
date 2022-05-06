const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

//Listens to message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //Scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    //Emit message to server
    socket.emit('chatMessage', msg);

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//Output message to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `
        <p class="meta">Brad <span>9:12pm</span></p>
        <p class="text">
            ${message}
        </p>`;
    document.querySelector(".chat-messages").appendChild(div)
}