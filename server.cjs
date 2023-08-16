const express = require('express');
const app = express();
const axios = require('axios');

app.get('/api/table-of-contents', async (req, res) => {
  try {
    const response = await axios.get('https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
