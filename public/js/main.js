const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');


//Get username and room for URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

//Join chatroom
socket.emit('joinRoom', { username, room });

//Get room and users 

socket.on('roomUsers', ({ room, users})=> {
    outputRoomName(room);
    outputUsers(users);
})

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
        <p class="meta">${message.username}<span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>`;
    document.querySelector(".chat-messages").appendChild(div)
}

//Add room name to DOM
function outputRoomName(room){
  roomName.innerText = room
}

function outputUsers(users){
    usersList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
   `
}