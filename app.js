import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onChildAdded
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const myName = localStorage.getItem("username");

const myPic = localStorage.getItem("profilePic");

document.getElementById("myProfile").src = myPic;

window.sendMessage = function(){

const input = document.getElementById("messageInput");

if(input.value.trim() === "") return;

push(chatRef, {
name: myName,
text: input.value,
pic: myPic
});

input.value = "";

};

onChildAdded(chatRef, (data)=>{

const messages = document.getElementById("messages");

const msg = data.val();

const div = document.createElement("div");

div.classList.add("messageRow");

if(msg.name === myName){
div.style.justifyContent = "flex-end";
}

div.innerHTML = `

<img src="${msg.pic}" class="profilePic">

<div class="messageBubble">
<b>${msg.name}</b><br>
${msg.text}
</div>

`;

messages.appendChild(div);

messages.scrollTop = messages.scrollHeight;

});