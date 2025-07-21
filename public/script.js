async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('You', message);
  input.value = '';

  try {
    const res = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    appendMessage('kutty', data.reply);
  } catch (err) {
    appendMessage('kutty', 'Something went wrong.');
  }
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messageDiv.style.marginBottom = '10px';
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});