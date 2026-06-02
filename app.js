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

window.sendMessage = function () {

  const input = document.getElementById("messageInput");

  if (input.value.trim() === "") return;

  push(chatRef, {
    text: input.value,
    sender: "you"
  });

  input.value = "";

};

onChildAdded(chatRef, (data) => {

  const messages = document.getElementById("messages");

  const messageData = data.val();

  const messageDiv = document.createElement("div");

  messageDiv.classList.add("messageRow");

  messageDiv.innerHTML = `
  
  <img src="https://i.imgur.com/3ZQ3Z6v.png" class="profilePic">

  <div class="messageBubble">
    ${messageData.text}
  </div>

  `;

  messages.appendChild(messageDiv);

  messages.scrollTop = messages.scrollHeight;

});