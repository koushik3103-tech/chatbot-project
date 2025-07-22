const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const selLang = document.getElementById('language-select');
const selPers = document.getElementById('personality-select');
const usernameContainer = document.getElementById('username-container');
const chatContainer = document.querySelector('.chat-container');
const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('start-btn');

startBtn.onclick = () => {
  const name = usernameInput.value.trim() || 'Friend';
  localStorage.setItem('username', name);
  usernameContainer.style.display = 'none';
  chatContainer.style.display = 'flex';
  appendMessage('Kutty', `Hi ${name}! Ready to chat?`, 'bot');
};

window.onload = () => {
  const name = localStorage.getItem('username');
  if (name) {
    usernameContainer.style.display = 'none';
    chatContainer.style.display = 'flex';
    appendMessage('Kutty', `Welcome back, ${name}!`, 'bot');
  }
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
};

document.getElementById('theme-toggle').onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : '');
};

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(sender, text, css) {
  const language = selLang.value;
  const messageDiv = document.createElement('div');
  let content = text;
  if (language === 'tamil') {
    content = text; // Placeholder—use API for real Tamil later
  }
  messageDiv.className = `message ${css}`;
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${content}`;
  chatBox.appendChild(messageDiv);
  scrollToBottom();
}

async function sendMessage() {
  const msg = input.value.trim(); if (!msg) return;
  const name = localStorage.getItem('username') || 'Friend';

  appendMessage(name, msg, 'user');
  input.value = '';
  const typing = document.createElement('div');
  typing.className = 'message bot typing';
  typing.innerText = 'Kutty is typing...';
  chatBox.appendChild(typing);
  scrollToBottom();

  try {
    const res = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, personality: selPers.value })
    });
    const data = await res.json();
    chatBox.removeChild(typing);
    appendMessage('Kutty', data.reply, 'bot');
  } catch {
    chatBox.removeChild(typing);
    appendMessage('Kutty', 'Oops! Something went wrong.', 'bot');
  }
}

document.getElementById('send-btn').onclick = sendMessage;
input.onkeydown = e => { if (e.key === 'Enter') sendMessage(); };
