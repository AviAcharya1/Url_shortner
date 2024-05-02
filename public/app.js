const longUrlInput = document.getElementById('longUrl');
const shortenBtn = document.getElementById('shortenBtn');
const resultDiv = document.getElementById('result');

shortenBtn.addEventListener('click', async () => {
  const longUrl = longUrlInput.value;
  if (!longUrl) {
    resultDiv.textContent = 'Please enter a URL';
    return;
  }

  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ longUrl })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const shortUrl = `${window.location.origin}/${data.shortUrl}`;
    resultDiv.textContent = `Short URL: ${shortUrl}`;
  } catch (error) {
    resultDiv.textContent = 'Error: ' + error.message;
  }
});