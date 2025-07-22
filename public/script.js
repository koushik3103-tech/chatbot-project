// ✅ References
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const personalitySelect = document.getElementById('personality-select');

// ✅ Send Message Function
async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  const personality = personalitySelect.value;

  appendMessage('You', message, 'user');
  input.value = '';

  // ✅ Typing indicator
  const typing = document.createElement('div');
  typing.className = 'message bot typing';
  typing.innerText = 'Kutty is typing...';
  chatBox.appendChild(typing);
  scrollToBottom();

  try {
    const res = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, personality })
    });

    const data = await res.json();
    chatBox.removeChild(typing);
    appendMessage('Kutty', data.reply, 'bot');
  } catch (err) {
    chatBox.removeChild(typing);
    appendMessage('Kutty', 'Something went wrong.', 'bot');
  }
}

// ✅ Append Message to Chat
function appendMessage(sender, text, cssClass) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${cssClass}`;
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageDiv);
  scrollToBottom();
}

// ✅ Scroll Chat to Bottom
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ✅ Event Listeners
document.getElementById('send-btn').addEventListener('click', sendMessage);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // ✅ Optional: Save preference
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
});

// ✅ Theme memory on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// ✅ Auto-focus input on page load
window.onload = () => {
  input.focus();
};

