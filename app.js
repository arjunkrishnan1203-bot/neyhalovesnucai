function sendMessage() {

  const input = document.getElementById("messageInput");
  const messages = document.getElementById("messages");

  if(input.value.trim() === "") return;

  const newMessage = document.createElement("div");

  newMessage.classList.add("message");

  newMessage.textContent = input.value;

  messages.appendChild(newMessage);

  input.value = "";

  messages.scrollTop = messages.scrollHeight;
}