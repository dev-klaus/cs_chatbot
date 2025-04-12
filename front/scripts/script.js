document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const question = document.getElementById('question').value;
  const responseDiv = document.getElementById('response');

  responseDiv.textContent = 'Thinking...';

  try {
    const res = await fetch('http://localhost:80/api/question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    responseDiv.textContent = data.answer;
  } catch (err) {
    responseDiv.textContent = 'Error: Could not connect to the AI server.';
  }
});
