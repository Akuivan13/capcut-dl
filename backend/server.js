const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

async function getRequest(url) {
  const requestData = {
    url: url
  };

  try {
    let { data: responseData } = await axios.post('https://api.teknogram.id/v1/capcut', requestData, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });

    const modifiedUrl = responseData.url.replace("open.", "");

    return {
      status: responseData.status,
      title: responseData.title,
      size: responseData.size,
      url: modifiedUrl
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  const result = await getRequest(url);

  if (result) {
    res.json(result);
  } else {
    res.status(500).json({ error: 'Failed to scrape the URL. Please try again.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});