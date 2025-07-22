async function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('You', message, 'user');
  input.value = '';

  // Typing Indicator
  const typing = document.createElement('div');
  typing.className = 'message bot typing';
  typing.innerText = 'Kutty is typing...';
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    chatBox.removeChild(typing);
    appendMessage('Kutty', data.reply, 'bot');
  } catch (error) {
    chatBox.removeChild(typing);
    appendMessage('Kutty', 'Something went wrong.', 'bot');
  }
}

function appendMessage(sender, text, cssClass) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${cssClass}`;
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
