const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function botReply(userText) {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: userText,
      }),
    });

    if (!response.ok) {
      throw new Error("Error generating the response.");
    }
    const result = await response.json();
    appendMessage(result.bot_message, "bot");
  } catch (err) {
    appendMessage("Error: " + err.message, "bot");
  }
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (!userText) return;
  appendMessage(userText, "user");
  chatInput.value = "";
  botReply(userText);
});
