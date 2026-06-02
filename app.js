import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onChildAdded
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyCFhF-Q0cSvHLe962frKH59QSKNHx-IauE",
authDomain: "nucaineyha.firebaseapp.com",
databaseURL: "https://nucaineyha-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "nucaineyha",
storageBucket: "nucaineyha.firebasestorage.app",
messagingSenderId: "692881987074",
appId: "1:692881987074:web:01d3f578d3729d51ccf91b"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const chatRef = ref(db, "messages");

const username =
localStorage.getItem("username") || "Unknown";

const profilePic =
localStorage.getItem("profilePic") ||
"https://i.imgur.com/9Xn4F8L.png";

document.getElementById("topProfile").src = profilePic;

window.sendMessage = function(){

const input = document.getElementById("messageInput");

const text = input.value.trim();

if(text === "") return;

push(chatRef,{
name: username,
photo: profilePic,
text: text
});

input.value = "";

};

document
.getElementById("messageInput")
.addEventListener("keydown", function(e){

if(e.key === "Enter"){

sendMessage();

}

});

onChildAdded(chatRef,(data)=>{

const msg = data.val();

const messages =
document.getElementById("messages");

messages.innerHTML += `

<div class="messageRow">

<img src="${msg.photo}" class="profilePic">

<div class="messageBubble">

<b>${msg.name}</b><br>

${msg.text}

</div>

</div>

`;

messages.scrollTop =
messages.scrollHeight;

});