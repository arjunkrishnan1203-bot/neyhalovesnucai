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
  databaseURL: "https://nucaineyha-default-rtdb.firebaseio.com",
  projectId: "nucaineyha",
  storageBucket: "nucaineyha.firebasestorage.app",
  messagingSenderId: "692881987074",
  appId: "1:692881987074:web:01d3f578d3729d51ccf91b",
  measurementId: "G-K6WK3CBNGQ"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const chatRef = ref(db, "messages");

window.sendMessage = function() {

const input = document.getElementById("messageInput");

if(input.value.trim() === "") return;

push(chatRef, {
text: input.value
});

input.value = "";

};

onChildAdded(chatRef, (data) => {

const messages = document.getElementById("messages");

const newMessage = document.createElement("div");

newMessage.classList.add("message");

newMessage.textContent = data.val().text;

messages.appendChild(newMessage);

messages.scrollTop = messages.scrollHeight;

});