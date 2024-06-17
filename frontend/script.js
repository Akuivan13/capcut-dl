document.getElementById('scrape-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const url = document.getElementById('url').value;
  const response = await fetch('/api/scrape', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  
  const result = await response.json();
  const resultDiv = document.getElementById('result');
  const videoPlayer = document.getElementById('video-player');
  const videoSource = document.getElementById('video-source');
  const resultUrl = document.getElementById('result-url');
  
  if (response.ok) {
    document.getElementById('status').innerText = result.status;
    document.getElementById('title').innerText = result.title;
    document.getElementById('size').innerText = result.size;
    
    videoSource.src = result.url;
    videoPlayer.classList.remove('hidden');
    videoPlayer.load();
    
    resultUrl.href = result.url;
    resultUrl.innerText = "Download Video";
    resultUrl.classList.remove('hidden');
    
    resultDiv.classList.remove('hidden');
  } else {
    resultDiv.innerHTML = `<p>${result.error}</p>`;
    resultDiv.classList.remove('hidden');
  }
});